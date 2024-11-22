package ws

import (
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	Conn     *websocket.Conn
	Message  chan *Message
	ID       string `json:"id"`
	RoomID   string `json:"roomId"`
	Username string `json:"username"`
}

type Message struct {
	Content  string `json:"content"`  // Tin nhan van ban
	RoomID   string `json:"roomId"`   // phong chat
	Username string `json:"username"` // Nguoi gui
	FileURL  string `json:"fileUrl"`  // URL file dinh kem
	FileName string `json:"fileName"` // Ten File
	IsFile   bool   `json:"File"`     // Danh dau neu day la file
}

func (c *Client) writeMessage() {
	defer func() {
		c.Conn.Close()
	}()

	for {
		message, ok := <-c.Message
		if !ok {
			return
		}

		// c.Conn.WriteJSON(message) // code cũ

		//------------------------------------------------------
		// Gửi tin nhắn dưới dạng JSON
		err := c.Conn.WriteJSON(message)
		if err != nil {
			log.Printf("Error sending message: %v", err)
			return
		}
		// ----------------------------------------------------
	}
}

func (c *Client) readMessage(hub *Hub) {
	defer func() {
		hub.Unregister <- c
		c.Conn.Close()
	}()

	for {
		_, m, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		// -------code cũ
		msg := &Message{
			Content:  string(m),
			RoomID:   c.RoomID,
			Username: c.Username,
		}
		// --------- code mới

		hub.Broadcast <- msg
	}
}

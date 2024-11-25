// import React from 'react'
// import { Message } from '../pages/app'

// const ChatBody = ({ data }: { data: Array<Message> }) => {
//     return (
//         <>
//             {data.map((message: Message, index: number) => {
//                 if (message.type == 'self') {
//                     return (
//                         <div
//                             className='flex flex-col mt-2 w-full text-right justify-end'
//                             key={index}
//                         >
//                             <div className='text-sm'>{message.username}</div>
//                             <div>
//                                 <div className='bg-blue text-white px-4 py-1 rounded-md inline-block mt-1'>
//                                     {message.content}
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 } else {
//                     return (
//                         <div className='mt-2' key={index}>
//                             <div className='text-sm'>{message.username}</div>
//                             <div>
//                                 <div className='bg-grey text-dark-secondary px-4 py-1 rounded-md inline-block mt-1'>
//                                     {/* Xử lí tin nhắn dạng file */}
//                                     {message.type == "file" ? (
//                                         <a
//                                             href={message.content}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="text-blue-500 underline"
//                                         >
//                                             {message.content.endsWith(".pdf")
//                                                 ? "📄 View PDF"
//                                                 : "🖼️ View File"}
//                                         </a>
//                                     ) : (
//                                         message.content
//                                     )}

//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 }
//             })}
//         </>
//     )
// }





// -------------------------------CODE MOI-------------------
import React from 'react'
import { Message } from '../pages/app'

const ChatBody = ({ data }: { data: Array<Message> }) => {
    return (
        <>
            {data.map((message: Message, index: number) => {
                // Kiểm tra nếu là tin nhắn của người gửi
                if (message.type == 'self') {
    
                    return (
                        <div
                            className='flex flex-col mt-2 w-full text-right justify-end'
                            key={index}
                        >
                            <div className='text-sm'>{message.username}</div>
                            <div>
                                <div className='bg-blue text-white px-4 py-1 rounded-md inline-block mt-1'>
                                    {message.content.replace(/^"|"$/g, '')?.match(/\.(jpeg|jpg|gif|png|bmp)$/) ? (
                                        <img
                                                src={message.content.replace(/^"|"$/g, '')}
                                                alt="file"
                                                className="max-w-full h-auto rounded-md"
                                        />
                                    ) : message.content.replace(/^"|"$/g, '').endsWith(".pdf") ? (
                                        
                                        <><iframe
                                                src={message.content.replace(/^"|"$/g, '')}
                                                width="100%"
                                                height="300px"
                                                typeof="application/pdf" /><a
                                                    href={message.content.replace(/^"|"$/g, '')}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline"
                                                >
                                                    📄 View PDF
                                                </a></>
                                    ) : (
                                        message.content
                                    )}
                                    {/* {message.content} */}
                                    
                                </div>
                            </div>
                        </div>
                    )
                } 
                
                if (message.type == 'recv') {
                    return (
                        <div
                            className='flex flex-col mt-2 w-full text-left justify-end'
                            key={index}
                        >
                            <div className='text-sm'>{message.username}</div>
                            <div>
                            <div className='bg-grey text-black px-4 py-1 rounded-md inline-block mt-1'>
                                    {message.content.replace(/^"|"$/g, '')?.match(/\.(jpeg|jpg|gif|png|bmp)$/) ? (
                                        // Code cu khong co link dowload
                                        // <img
                                        //         src={message.content.replace(/^"|"$/g, '')}
                                        //         alt="file"
                                        //         className="max-w-full h-auto rounded-md"
                                        // />
                                        
                                        <><img
                                            src={message.content.replace(/^"|"$/g, '')}
                                            alt="file"
                                            className="max-w-full h-auto rounded-md" /><a
                                                href={message.content.replace(/^"|"$/g, '')}
                                                download
                                                className="mt-2 text-blue-500 underline block"
                                            >
                                                📥 Download Image
                                            </a></>
                                    ) : message.content.replace(/^"|"$/g, '').endsWith(".pdf") ? (
                                        <><iframe
                                                src={message.content.replace(/^"|"$/g, '')}
                                                width="100%"
                                                height="300px"
                                                typeof="application/pdf" /><a
                                                    href={message.content.replace(/^"|"$/g, '')}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline"
                                                >
                                                    📄 View PDF
                                                </a></>
                                    
                                    ) : message.content.replace(/^"|"$/g, '')?.match(/\.(go|txt|py|tsx|cpp|csv)$/) ? (
                                        <><iframe
                                                src={message.content.replace(/^"|"$/g, '')}
                                                width="100%"
                                                height="300px"
                                                typeof="application/pdf" /><a
                                                    href={message.content.replace(/^"|"$/g, '')}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline"
                                                >
                                                    📄 View file
                                                </a></>
                                    ) : (
                                        message.content
                                    )}
                                    {/* {message.content} */}
                                    
                                </div>
                            </div>
                        </div>
                    )
                }
                // else {
                //     return (
                //         <div className='mt-2' key={index}>
                //             <div className='text-sm'>{message.username}</div>
                //             <div>
                //                 <div className='bg-grey text-dark-secondary px-4 py-1 rounded-md inline-block mt-1'>
                //                     {/* Xử lí tin nhắn dạng file */}
                //                     {message.type === "file" ? (
                //                         message.fileUrl?.match(/\.(jpeg|jpg|gif|png|bmp)$/) ? (
                //                             // Hiển thị ảnh khi là file ảnh
                //                             <img
                //                                 src={message.fileUrl}
                //                                 alt="file"
                //                                 className="max-w-full h-auto rounded-md"
                //                             />
                //                         ) : message.content.endsWith(".pdf") ? (
                //                             // Hiển thị PDF khi là file PDF
                //                             <a
                //                                 href={message.content}
                //                                 target="_blank"
                //                                 rel="noopener noreferrer"
                //                                 className="text-blue-500 underline"
                //                             >
                //                                 📄 View PDF
                //                             </a>
                //                         ) : (
                //                             // Hiển thị file khác (tải xuống)
                //                             <a
                //                                 href={message.content}
                //                                 target="_blank"
                //                                 rel="noopener noreferrer"
                //                                 className="text-blue-500 underline"
                //                             >
                //                                 🖼️ View File
                //                             </a>
                //                         )
                //                     ) : (
                //                         // Xử lý tin nhắn văn bản thông thường
                //                         message.content
                //                     )}
                //                 </div>
                //             </div>
                //         </div>
                //     );
                // }
            })}
        </>
    )
}


export default ChatBody
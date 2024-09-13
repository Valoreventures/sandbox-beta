import React, { useState, useEffect, useRef } from 'react';
import { Button, TextInput, Card } from 'flowbite-react';
// import { format } from 'date-fns';
import {supabase} from '../utils/supabase';
import TopBar from '../components/TopBar';
import { Menu } from '@headlessui/react';
import CalendarDateHeader from '../components/CalendarDateHeader';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userId } = useParams();


  

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
        console.log(data,"jj");
      if (error) {
        console.error('Error fetching messages:', error);
        alert('Error fetching messages: ' + error.message); // Displaying error in UI for better visibility
      } else {
        setMessages(data || []);
      }
    };
  
    fetchMessages();
  
    const channel = supabase.channel('chat');
  
    channel
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        console.log('New message:', payload.new); // Log new message for debugging
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe((status, error) => {
        if (error) {
          console.error('Subscription error:', error);
          alert('Subscription error: ' + error.message); // Displaying subscription error in UI
        }
      });
  
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
 console.log(newMessage,userId,"pppp");
    const { error } = await supabase.from('messages').insert({
      content: newMessage,
      user_id: userId, // Replace with actual user ID
      username: 'sundar', // Replace with actual username
    });
    
    if (error) console.error('Error sending message:', error);
    else setNewMessage('');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 mt-20">
       <TopBar toggleMenu={toggleMenu} />
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <Menu toggleMenu={toggleMenu} />
        </div>
      )}
      {/* <CalendarDateHeader
        currentDate={currentDate}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      /> */}
      <Card className='my-auto h-min'>
        <h2 className="text-2xl font-bold mb-4">Chat Room</h2>
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.user_id === 'user1' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs ${
                  message.user_id === 'user1'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-900'
                } rounded-lg p-3`}
              >
                <p className="text-sm font-semibold">{message.username}</p>
                <p>{message.content}</p>
                <p className="text-xs text-right mt-1">
                  {/* {format(new Date(message.created_at), 'HH:mm')} */}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <TextInput
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
          />
          <Button className='bg-darkpapyrus text-black' type="submit">Send</Button>
        </form>
      </Card>
    </div>
  );
};

export default ChatPage;


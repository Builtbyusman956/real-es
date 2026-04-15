// src/pages/dashboard/Messages.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Search, ArrowLeft, MoreVertical, Phone, Video,
  Image as ImageIcon, Send, Paperclip, Check, CheckCheck,
  Shield, DollarSign, X, Clock, AlertCircle, MessageCircle
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_CONVERSATIONS = [
  {
    id: 1,
    participant: {
      id: "agent_1",
      name: "Emeka Okafor",
      avatar: "EO",
      role: "agent",
      verified: true,
      online: true
    },
    property: {
      id: "prop_1",
      title: "3 Bedroom Flat — Lekki Phase 1",
      price: "₦2,500,000/yr",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=200&q=80"
    },
    lastMessage: {
      text: "I've uploaded the video tour. Let me know what you think!",
      timestamp: "2026-04-14T08:15:00",
      unread: 2,
      sender: "them"
    },
    messages: [
      {
        id: 1,
        sender: "them",
        type: "text",
        text: "Hi! I saw your request for a 3 bedroom in Lekki. I have the perfect property available.",
        timestamp: "2026-04-13T14:30:00",
        status: "read"
      },
      {
        id: 2,
        sender: "me",
        type: "text",
        text: "Great! Can you send me more details and photos?",
        timestamp: "2026-04-13T14:35:00",
        status: "read"
      },
      {
        id: 3,
        sender: "them",
        type: "property_card",
        property: {
          title: "3 Bedroom Flat — Lekki Phase 1",
          price: "₦2,500,000/yr",
          beds: 3,
          baths: 2,
          image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
        },
        timestamp: "2026-04-13T14:40:00",
        status: "read"
      },
      {
        id: 4,
        sender: "them",
        type: "text",
        text: "I've uploaded the video tour. Let me know what you think!",
        timestamp: "2026-04-14T08:15:00",
        status: "delivered"
      }
    ]
  },
  {
    id: 2,
    participant: {
      id: "buyer_1",
      name: "Chidi Nwosu",
      avatar: "CN",
      role: "buyer",
      verified: true,
      online: false
    },
    property: {
      id: "prop_2",
      title: "5 Bedroom Duplex — Ikoyi",
      price: "₦150,000,000",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=80"
    },
    lastMessage: {
      text: "Can we schedule a viewing for Saturday?",
      timestamp: "2026-04-13T18:20:00",
      unread: 0,
      sender: "me"
    },
    messages: []
  }
];

// ─── Offer Card Component ─────────────────────────────────────────────────────
const OfferCard = ({ offer, onAccept, onDecline, status }) => {
  const isIncoming = offer.sender !== "me";
  
  return (
    <div className={`rounded-2xl p-4 border-2 ${
      status === "accepted" ? "border-green-500 bg-green-50" :
      status === "declined" ? "border-red-500 bg-red-50" :
      "border-[#C9A84C] bg-[#C9A84C]/5"
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-1.5 rounded-full ${
          status === "accepted" ? "bg-green-500" :
          status === "declined" ? "bg-red-500" :
          "bg-[#C9A84C]"
        }`}>
          <DollarSign size={16} className="text-white" />
        </div>
        <span className={`text-xs font-bold uppercase tracking-wide ${
          status === "accepted" ? "text-green-700" :
          status === "declined" ? "text-red-700" :
          "text-[#C9A84C]"
        }`}>
          {status === "accepted" ? "Offer Accepted" :
           status === "declined" ? "Offer Declined" :
           isIncoming ? "Incoming Offer" : "Offer Sent"}
        </span>
      </div>
      
      <h4 className="font-bold text-[#0A1628] mb-1">{offer.propertyTitle}</h4>
      <p className="text-2xl font-bold text-[#0A1628] mb-2">{offer.price}</p>
      <p className="text-sm text-[#6B7280] mb-4">{offer.message}</p>
      
      {status === "pending" && isIncoming && (
        <div className="flex gap-2">
          <button 
            onClick={onDecline}
            className="flex-1 py-2.5 rounded-xl border border-red-300 text-red-600 font-semibold text-sm hover:bg-red-50 transition"
          >
            Decline
          </button>
          <button 
            onClick={onAccept}
            className="flex-1 py-2.5 rounded-xl bg-[#C9A84C] text-[#0A1628] font-bold text-sm hover:bg-[#b8943d] transition"
          >
            Accept & Pay
          </button>
        </div>
      )}
      
      {status === "pending" && !isIncoming && (
        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
          <Clock size={14} />
          <span>Awaiting response...</span>
        </div>
      )}
    </div>
  );
};

// ─── Message Bubble ───────────────────────────────────────────────────────────
const MessageBubble = ({ message, isMe, onAcceptOffer, onDeclineOffer }) => {
  const isOffer = message.type === "offer";
  const isProperty = message.type === "property_card";
  
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
        {/* Offer Card */}
        {isOffer && (
          <OfferCard 
            offer={message.offer}
            status={message.offer.status}
            onAccept={() => onAcceptOffer(message.id)}
            onDecline={() => onDeclineOffer(message.id)}
          />
        )}
        
        {/* Property Card */}
        {isProperty && (
          <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden shadow-sm">
            <img 
              src={message.property.image} 
              alt={message.property.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h4 className="font-bold text-[#0A1628] text-sm mb-1">{message.property.title}</h4>
              <p className="text-[#C9A84C] font-bold">{message.property.price}</p>
              <div className="flex gap-3 mt-2 text-xs text-[#6B7280]">
                <span>🛏 {message.property.beds}</span>
                <span>🚿 {message.property.baths}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Text Message */}
        {message.type === "text" && (
          <div className={`rounded-2xl px-4 py-2.5 ${
            isMe 
              ? "bg-[#C9A84C] text-[#0A1628] rounded-br-md" 
              : "bg-white border border-[#E0D9CF] text-[#0A1628] rounded-bl-md"
          }`}>
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
        )}
        
        {/* Image Message */}
        {message.type === "image" && (
          <div className="rounded-2xl overflow-hidden border border-[#E0D9CF]">
            <img 
              src={message.url} 
              alt="Shared" 
              className="max-w-full max-h-64 object-cover"
            />
          </div>
        )}
        
        {/* Status & Time */}
        <div className={`flex items-center gap-1 mt-1 ${
          isMe ? "justify-end" : "justify-start"
        }`}>
          <span className="text-[10px] text-[#6B7280]">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isMe && (
            <span className="text-[#C9A84C]">
              {message.status === "read" ? <CheckCheck size={12} /> : 
               message.status === "delivered" ? <Check size={12} /> : 
               <Clock size={12} className="text-[#6B7280]" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Conversation List Item ───────────────────────────────────────────────────
const ConversationItem = ({ conversation, isActive, onClick }) => {
  const { participant, property, lastMessage } = conversation;
  
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-3 rounded-xl transition text-left ${
        isActive ? "bg-[#C9A84C]/10 border border-[#C9A84C]/30" : "hover:bg-white border border-transparent"
      }`}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-[#0A1628] flex items-center justify-center text-[#C9A84C] font-bold text-sm flex-shrink-0">
          {participant.avatar}
        </div>
        {participant.online && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <p className="font-bold text-[#0A1628] text-sm truncate">{participant.name}</p>
          {participant.verified && <Shield size={12} className="text-[#C9A84C] flex-shrink-0" />}
        </div>
        
        <p className="text-xs text-[#6B7280] truncate mb-1">{property.title}</p>
        
        <div className="flex items-center gap-1">
          <p className={`text-xs truncate flex-1 ${lastMessage.unread > 0 ? "text-[#0A1628] font-medium" : "text-[#6B7280]"}`}>
            {lastMessage.sender === "me" && <span className="text-[#6B7280]">You: </span>}
            {lastMessage.text}
          </p>
          
          {lastMessage.unread > 0 && (
            <span className="bg-[#C9A84C] text-[#0A1628] text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {lastMessage.unread}
            </span>
          )}
        </div>
      </div>
      
      <span className="text-[10px] text-[#6B7280] whitespace-nowrap">
        {new Date(lastMessage.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
      </span>
    </button>
  );
};

// ─── Payment Modal ────────────────────────────────────────────────────────────
const PaymentModal = ({ offer, onClose, onPay }) => {
  const [step, setStep] = useState("review"); // review, processing, success
  
  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        onPay();
        onClose();
      }, 2000);
    }, 2000);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {step === "review" && (
          <>
            <div className="bg-[#0A1628] px-5 py-4">
              <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest mb-0.5">Secure Payment</p>
              <p className="text-[#F7F4EF] font-bold text-sm">Complete Your Booking</p>
            </div>
            
            <div className="p-5">
              <div className="bg-[#F7F4EF] rounded-xl p-4 mb-4">
                <p className="text-xs text-[#6B7280] mb-1">{offer.propertyTitle}</p>
                <p className="text-2xl font-bold text-[#0A1628]">{offer.price}</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Platform Fee (5%)</span>
                  <span className="text-[#0A1628]">₦{Math.round(parseInt(offer.price.replace(/[^0-9]/g, '')) * 0.05).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-[#E0D9CF] pt-2">
                  <span className="text-[#0A1628]">Total</span>
                  <span className="text-[#0A1628]">₦{Math.round(parseInt(offer.price.replace(/[^0-9]/g, '')) * 1.05).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                <div className="flex items-start gap-2">
                  <Shield size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700">
                    Your payment is held securely. Funds are released to the agent only after you confirm the property handover.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button onClick={onClose}
                  className="flex-1 border border-[#E0D9CF] text-[#6B7280] py-2.5 rounded-xl text-sm font-semibold transition">
                  Cancel
                </button>
                <button onClick={handlePay}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] py-2.5 rounded-xl text-sm font-bold transition">
                  <DollarSign size={15} /> Pay Securely
                </button>
              </div>
            </div>
          </>
        )}
        
        {step === "processing" && (
          <div className="p-8 text-center">
            <div className="w-12 h-12 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-[#0A1628]">Processing Payment...</p>
            <p className="text-sm text-[#6B7280] mt-1">Please do not close this window</p>
          </div>
        )}
        
        {step === "success" && (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-white" />
            </div>
            <p className="font-bold text-[#0A1628]">Payment Successful!</p>
            <p className="text-sm text-[#6B7280] mt-1">Your booking is confirmed</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Messages = () => {
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeId, setActiveId] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingOffer, setPendingOffer] = useState(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef(null);
  
  const activeConversation = conversations.find(c => c.id === activeId);
  
  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);
  
  const handleSend = () => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: "me",
      type: "text",
      text: messageText,
      timestamp: new Date().toISOString(),
      status: "sent"
    };
    
    // Update conversations
    setConversations(prev => prev.map(c => {
      if (c.id === activeId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: {
            text: messageText,
            timestamp: new Date().toISOString(),
            unread: 0,
            sender: "me"
          }
        };
      }
      return c;
    }));
    
    setMessageText("");
    
    // Simulate reply after 2 seconds
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: "them",
        type: "text",
        text: "Thanks for your message! I'll get back to you shortly.",
        timestamp: new Date().toISOString(),
        status: "delivered"
      };
      
      setConversations(prev => prev.map(c => {
        if (c.id === activeId) {
          return {
            ...c,
            messages: [...c.messages, reply],
            lastMessage: {
              text: reply.text,
              timestamp: new Date().toISOString(),
              unread: 1,
              sender: "them"
            }
          };
        }
        return c;
      }));
    }, 2000);
  };
  
  const handleAcceptOffer = (messageId) => {
    const offerMessage = activeConversation.messages.find(m => m.id === messageId);
    setPendingOffer(offerMessage.offer);
    setShowPaymentModal(true);
  };
  
  const handlePay = () => {
    // Update offer status to accepted
    setConversations(prev => prev.map(c => {
      if (c.id === activeId) {
        return {
          ...c,
          messages: c.messages.map(m => 
            m.offer ? { ...m, offer: { ...m.offer, status: "accepted" } } : m
          )
        };
      }
      return c;
    }));
  };
  
  const handleSendOffer = () => {
    const offerMessage = {
      id: Date.now(),
      sender: "me",
      type: "offer",
      offer: {
        propertyTitle: activeConversation.property.title,
        price: "₦2,200,000/yr",
        message: "Special discount for quick decision!",
        status: "pending"
      },
      timestamp: new Date().toISOString(),
      status: "sent"
    };
    
    setConversations(prev => prev.map(c => {
      if (c.id === activeId) {
        return {
          ...c,
          messages: [...c.messages, offerMessage]
        };
      }
      return c;
    }));
  };

  return (
    <div className="h-[calc(100vh-200px)] bg-[#F7F4EF] flex rounded-2xl border border-[#E0D9CF] overflow-hidden">
      
      {/* Conversation List - Left Sidebar */}
      <div className={`w-full md:w-80 bg-white border-r border-[#E0D9CF] flex flex-col ${
        showMobileChat ? "hidden md:flex" : "flex"
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-[#E0D9CF]">
          <h2 className="font-bold text-[#0A1628] text-lg mb-3">Messages</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input 
              type="text" 
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 bg-[#F7F4EF] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#C9A84C]"
            />
          </div>
        </div>
        
        {/* List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map(conv => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isActive={conv.id === activeId}
              onClick={() => {
                setActiveId(conv.id);
                setShowMobileChat(true);
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Message Thread - Right Panel */}
      <div className={`flex-1 flex flex-col ${
        !showMobileChat ? "hidden md:flex" : "flex"
      }`}>
        {activeConversation ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-[#E0D9CF] px-4 py-3 flex items-center gap-3">
              <button 
                onClick={() => setShowMobileChat(false)}
                className="md:hidden p-2 -ml-2 hover:bg-[#F7F4EF] rounded-lg transition"
              >
                <ArrowLeft size={20} className="text-[#6B7280]" />
              </button>
              
              <div className="w-10 h-10 rounded-xl bg-[#0A1628] flex items-center justify-center text-[#C9A84C] font-bold text-sm">
                {activeConversation.participant.avatar}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-[#0A1628] text-sm">{activeConversation.participant.name}</p>
                  {activeConversation.participant.verified && <Shield size={12} className="text-[#C9A84C]" />}
                </div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  {activeConversation.participant.online ? "Online" : "Offline"}
                </p>
              </div>
              
              <button className="p-2 hover:bg-[#F7F4EF] rounded-lg transition">
                <Phone size={18} className="text-[#6B7280]" />
              </button>
              <button className="p-2 hover:bg-[#F7F4EF] rounded-lg transition">
                <MoreVertical size={18} className="text-[#6B7280]" />
              </button>
            </div>
            
            {/* Property Context Card */}
            <div className="bg-white border-b border-[#E0D9CF] px-4 py-3">
              <div className="flex items-center gap-3">
                <img 
                  src={activeConversation.property.image} 
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#0A1628] text-sm truncate">{activeConversation.property.title}</p>
                  <p className="text-[#C9A84C] font-bold text-sm">{activeConversation.property.price}</p>
                </div>
                <button 
                  onClick={handleSendOffer}
                  className="px-3 py-1.5 bg-[#C9A84C] text-[#0A1628] text-xs font-bold rounded-lg hover:bg-[#b8943d] transition"
                >
                  Send Offer
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#F7F4EF]">
              <div className="max-w-3xl mx-auto">
                {/* Escrow Notice */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2 flex items-center gap-2">
                    <Shield size={14} className="text-blue-600" />
                    <span className="text-xs text-blue-700">
                      Payments protected by OrbitWatch Escrow
                    </span>
                  </div>
                </div>
                
                {activeConversation.messages.map(message => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isMe={message.sender === "me"}
                    onAcceptOffer={handleAcceptOffer}
                    onDeclineOffer={() => {}}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input */}
            <div className="bg-white border-t border-[#E0D9CF] px-4 py-3">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#F7F4EF] rounded-lg transition">
                  <Paperclip size={20} className="text-[#6B7280]" />
                </button>
                <button className="p-2 hover:bg-[#F7F4EF] rounded-lg transition">
                  <ImageIcon size={20} className="text-[#6B7280]" />
                </button>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-[#F7F4EF] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#C9A84C]"
                />
                <button 
                  onClick={handleSend}
                  disabled={!messageText.trim()}
                  className="p-2.5 bg-[#C9A84C] text-[#0A1628] rounded-xl hover:bg-[#b8943d] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Send size={18} />
                </button>
              </div>
              
              {/* Warning */}
              <p className="text-[10px] text-[#6B7280] text-center mt-2 flex items-center justify-center gap-1">
                <AlertCircle size={10} />
                Never pay outside OrbitWatch. Report suspicious messages.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-[#E8D5A3]/40 flex items-center justify-center mb-4">
              <MessageCircle size={28} className="text-[#C9A84C]" />
            </div>
            <p className="font-bold text-[#0A1628] text-lg">Select a conversation</p>
            <p className="text-[#6B7280] text-sm mt-1">Choose a conversation from the list to start messaging</p>
          </div>
        )}
      </div>
      
      {/* Payment Modal */}
      {showPaymentModal && pendingOffer && (
        <PaymentModal 
          offer={pendingOffer}
          onClose={() => setShowPaymentModal(false)}
          onPay={handlePay}
        />
      )}
    </div>
  );
};

export default Messages;
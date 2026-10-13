import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NestoAvatar } from '../common/NestoAvatar';
import { fetchNestoAiAdvice } from '../../services/recommendationEngine';
import { X, Send, Sparkles, MessageSquare, ArrowRight, Lightbulb } from 'lucide-react';

interface NestoChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  context?: any;
}

interface Message {
  sender: 'nesto' | 'user';
  text: string;
  timestamp: string;
  source?: string;
}

export const NestoChatDrawer: React.FC<NestoChatDrawerProps> = ({
  isOpen,
  onClose,
  context,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'nesto',
      text: "Hello! I'm Nesto, your Baya Weaver design guide. Tell me how you'd like your room to feel, or ask about lighting, wall colors, or matching wooden floors.",
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const quickQuestions = [
    "I'm confused — help me choose",
    'How do I make a small room feel bigger?',
    'What colors go best with oak flooring?',
    'Is my room too dark for sage green?',
    'Should I pick matte or satin finish?',
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    try {
      const reply = await fetchNestoAiAdvice(textToSend, context);
      const nestoMsg: Message = {
        sender: 'nesto',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, nestoMsg]);
    } catch (e) {
      const fallbackMsg: Message = {
        sender: 'nesto',
        text: "I recommend pairing gentle natural neutrals with soft 2700K ambient lighting to keep your room cozy and spacious.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-[#FAF8F5] border-l border-[#E3D9C9] shadow-2xl z-50 flex flex-col"
          >
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-[#E8DFC5] bg-[#F4EFE6] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <NestoAvatar mood={isThinking ? 'thinking' : 'happy'} size="md" />
                <div>
                  <div className="font-bold text-sm text-[#1E3F30] flex items-center gap-1.5">
                    <span>Nesto</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-[11px] text-[#8F5B34] font-medium">
                    Your Baya Weaver Design Companion
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-[#EAE1CF] text-[#6B726B] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'nesto' && <NestoAvatar mood="explaining" size="sm" />}
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      m.sender === 'user'
                        ? 'bg-[#234B38] text-white rounded-br-xs'
                        : 'bg-white border border-[#E3DACB] text-[#2C332D] rounded-bl-xs'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span
                      className={`text-[9px] block mt-1 text-right ${
                        m.sender === 'user' ? 'text-[#E5DEC3]' : 'text-[#8F5B34]'
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex gap-2.5 items-center text-xs text-[#8F5B34] italic p-2 bg-[#F3EFE7] rounded-xl border border-[#E0D7C6] w-fit">
                  <NestoAvatar mood="thinking" size="sm" />
                  <span>Nesto is weaving your advice...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Starters */}
            <div className="p-3 bg-[#F4EFE6] border-t border-[#E8DFC5]">
              <div className="text-[11px] font-bold text-[#8F5B34] mb-2 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-[#C28E58]" />
                <span>Quick Questions for Nesto:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className="px-2.5 py-1 rounded-full bg-white border border-[#E0D7C6] hover:border-[#234B38] text-[11px] font-medium text-[#2C332D] hover:bg-[#FAF8F5] transition-all cursor-pointer text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Box */}
            <div className="p-3.5 bg-white border-t border-[#E8DFC5]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask Nesto anything about home design..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#DCD3C2] bg-[#FAF8F5] text-xs sm:text-sm text-[#1C1E1B] focus:outline-none focus:ring-2 focus:ring-[#234B38]"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isThinking}
                  className="p-2.5 rounded-xl bg-[#234B38] text-white disabled:opacity-40 hover:bg-[#1E3F30] transition-all cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SendIcon from '@mui/icons-material/Send';
import BoltIcon from '@mui/icons-material/Bolt';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { colinaHtml } from './colina_content';

const LetterEditor = () => {
    const navigate = useNavigate();

    // 3-Pane visual layout (Left pane hidden, Center doc, Right chat)
    const [leftPaneOpen, setLeftPaneOpen] = useState(false);
    const [rightPaneOpen, setRightPaneOpen] = useState(true);

    // Rich Text Editor State
    const [editorHtml, setEditorHtml] = useState(colinaHtml);

    // UI state
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            text: 'Hello! I\'m your LAR AI assistant. I can help you refine this letter — ask me to adjust tone, add data points, restructure sections, or generate new content.'
        },
        {
            role: 'user',
            text: 'Can you make the Executive Summary more concise?'
        },
        {
            role: 'ai',
            text: `Sure! Here's a tighter version:

**"We propose acquiring 48.5 acres in Phoenix, AZ to develop 142 lots at Sunset Ridge — a high-growth submarket with 12.4% YoY appreciation and strong absorption rates."**

Would you like me to apply this change directly to the letter?`
        }
    ]);

    const handleSendMsg = () => {
        if (!chatInput.trim()) return;
        setMessages([...messages, { role: 'user', text: chatInput }]);
        setChatInput('');

        // Mock AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: "I've applied those changes to the document. Let me know if you need anything else!"
            }]);
        }, 1000);
    };

    return (
        <div className="ai-editor-wrapper" style={{ marginTop: '56px' }}>
            {/* Top Bar Navigation */}
            <div className="ai-editor-topbar">
                <div className="ai-editor-breadcrumbs d-flex align-items-center">
                    <span
                        style={{ cursor: 'pointer', color: '#002532' }}
                        onClick={() => navigate('/presidents-letter')}
                        className="fw-bold text-decoration-underline-hover hover-link"
                    >
                        Dashboard
                    </span>
                    <span className="mx-2 text-muted">/</span>
                    <span className="text-muted">Edit Letter</span>
                    <span className="mx-2 text-muted">·</span>
                    <span className="active">President's Letter — Sunset Ridge</span>
                    <span className="ai-editor-breadcrumbs meta">v1.2 · Saved 2m ago</span>
                </div>
                <div className="ai-editor-actions">
                    <button className="btn-discard"><CloseIcon fontSize="small" className="me-1" /> Discard</button>
                    <button className="btn-save">📄 Save</button>
                </div>
            </div>

            {/* Main 3-Pane Area */}
            <div className="ai-editor-main position-relative">

                {/* Simulated Left Thin Pane (collapsed state) */}
                <div style={{ width: leftPaneOpen ? '200px' : '0px', transition: 'width 0.3s', position: 'relative' }}>
                    {!leftPaneOpen && (
                        <div className="ai-pane-toggle left" onClick={() => setLeftPaneOpen(true)} style={{ left: '-10px' }}>
                            <KeyboardArrowRightIcon fontSize="small" />
                        </div>
                    )}
                </div>

                {/* Center Document Pane */}
                <div className="ai-doc-pane">

                    {leftPaneOpen && (
                        <div className="ai-pane-toggle left" onClick={() => setLeftPaneOpen(false)} style={{ left: '-12px', zIndex: 100 }}>
                            <KeyboardArrowLeftIcon fontSize="small" />
                        </div>
                    )}

                    {/* Content Editor Area */}
                    <div className="ai-doc-editor-wrapper h-100 d-flex flex-column" style={{ padding: '0', border: 'none' }}>
                        <JoditEditor
                            value={editorHtml}
                            onBlur={(newContent) => setEditorHtml(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => { }}
                            config={{
                                readonly: false,
                                height: '100%',
                                outline: false,
                                toolbarSticky: false,
                                showCharsCounter: false,
                                showWordsCounter: false,
                                showXPathInStatusbar: false,
                                style: {
                                    fontFamily: 'Helvetica,Arial,sans-serif',
                                    padding: '2rem'
                                },
                            }}
                        />
                    </div>

                    {rightPaneOpen && (
                        <div className="ai-pane-toggle right" onClick={() => setRightPaneOpen(false)} style={{ right: '-12px', zIndex: 100 }}>
                            <KeyboardArrowRightIcon fontSize="small" />
                        </div>
                    )}
                </div>

                {/* Right Chat Pane */}
                {rightPaneOpen && (
                    <div className="ai-chat-pane">
                        <div className="ai-chat-header">
                            <div className="ai-avatar"><BoltIcon fontSize="small" /></div>
                            <div className="ai-chat-header-text">
                                <h6>AI Assistant</h6>
                                <p>Ask me to edit, refine, or expand</p>
                            </div>
                        </div>

                        <div className="ai-chat-messages">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`ai-msg-row ${msg.role}`}>
                                    {msg.role === 'ai' && (
                                        <div className="ai-avatar-dark">
                                            <BoltIcon style={{ fontSize: '1.2rem' }} />
                                        </div>
                                    )}
                                    <div className="ai-bubble">
                                        {msg.text.split('\n').map((line, i) => {
                                            if (line.trim() === '') return <br key={i} />
                                            // Simple markdown bold parser for prototype
                                            if (line.includes('**')) {
                                                const parts = line.split('**');
                                                return <p key={i} style={{ margin: 0 }}>
                                                    {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
                                                </p>;
                                            }
                                            return <span key={i} style={{ display: 'block' }}>{line}</span>
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="ai-chat-input-area">
                            <div className="ai-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Ask the AI to edit this letter..."
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMsg()}
                                />
                                <button className="ai-input-btn" onClick={handleSendMsg}>
                                    <SendIcon style={{ fontSize: '1rem' }} />
                                </button>
                            </div>
                            <div className="ai-input-hint">
                                Press Enter to send · Shift+Enter for new line
                            </div>
                        </div>
                    </div>
                )}

                {!rightPaneOpen && (
                    <div style={{ width: '0px', position: 'relative' }}>
                        <div className="ai-pane-toggle right" onClick={() => setRightPaneOpen(true)} style={{ left: '-12px' }}>
                            <KeyboardArrowLeftIcon fontSize="small" />
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default LetterEditor

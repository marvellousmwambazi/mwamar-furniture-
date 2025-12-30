// MWAMAR AI Chatbot
class MwamarChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatbot();
        this.addEventListeners();
        this.addWelcomeMessage();
    }

    createChatbot() {
        const chatbotHTML = `
            <div id="mwamar-chatbot" class="chatbot-container">
                <div class="chatbot-toggle" id="chatbot-toggle">
                    <i class="fas fa-comments"></i>
                    <span class="chat-notification">💬</span>
                </div>
                
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-title">
                            <i class="fas fa-robot"></i>
                            Mikal - MWAMAR Assistant
                        </div>
                        <button class="chatbot-close" id="chatbot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages">
                        <!-- Messages will be added here -->
                    </div>
                    
                    <div class="chatbot-input-area">
                        <input type="text" id="chatbot-input" placeholder="Ask about our furniture..." maxlength="200">
                        <button id="chatbot-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-quick-actions">
                        <button class="quick-action" data-message="What furniture do you have?">Our Products</button>
                        <button class="quick-action" data-message="What are your prices?">Pricing</button>
                        <button class="quick-action" data-message="How can I contact you?">Contact</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    addEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const send = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const quickActions = document.querySelectorAll('.quick-action');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.closeChat());
        send.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const message = action.getAttribute('data-message');
                this.sendUserMessage(message);
            });
        });
    }

    toggleChat() {
        const window = document.getElementById('chatbot-window');
        const notification = document.querySelector('.chat-notification');
        
        this.isOpen = !this.isOpen;
        window.style.display = this.isOpen ? 'flex' : 'none';
        
        if (this.isOpen) {
            notification.style.display = 'none';
            document.getElementById('chatbot-input').focus();
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chatbot-window').style.display = 'none';
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.addBotMessage("👋 Hello! I'm Mikal, your MWAMAR furniture assistant. I can help you with information about our handcrafted wooden furniture. How can I assist you today?");
        }, 1000);
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (message) {
            this.sendUserMessage(message);
            input.value = '';
        }
    }

    sendUserMessage(message) {
        this.addUserMessage(message);
        
        // Simulate typing delay
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addBotMessage(response);
        }, 1000);
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="bot-avatar">🤖</div>
            <div class="message-content">${message}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Furniture products
        if (lowerMessage.includes('furniture') || lowerMessage.includes('products') || lowerMessage.includes('what do you have')) {
            return "🛋️ We specialize in handcrafted wooden furniture including:<br>• Sofas (K3,000 - K74,590)<br>• Dining Tables (K5,000 - K5,999)<br>• Armchairs (K2,210)<br>• Lounge Sets (K12,500)<br><br>All made with premium Zambian hardwood! Would you like details about any specific piece?";
        }
        
        // Pricing
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
            return "💰 Our furniture prices range from K2,210 to K74,590:<br>• Armchairs: K2,210<br>• Premium Sofas: K3,000<br>• Dining Tables: K5,000 - K5,999<br>• Luxury Lounge Sets: K12,500<br>• Premium Cream Sofas: K74,590<br><br>All pieces are handcrafted with premium materials. Custom orders available!";
        }
        
        // Contact information
        if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('call') || lowerMessage.includes('reach')) {
            return "📞 You can reach us at:<br>• Phone: 0974738105<br>• Email: mwambazimarvellous@gmail.com<br>• Location: Lusaka, Zambia<br><br>We're available Mon-Sat, 8AM-6PM. You can also use our contact form on the website!";
        }
        
        // Custom orders
        if (lowerMessage.includes('custom') || lowerMessage.includes('bespoke') || lowerMessage.includes('design')) {
            return "🎨 Yes! We offer custom furniture design services:<br>• Bespoke pieces tailored to your space<br>• Choice of wood types and finishes<br>• Professional design consultation<br>• Made to your exact specifications<br><br>Contact us at 0974738105 to discuss your custom project!";
        }
        
        // About company
        if (lowerMessage.includes('about') || lowerMessage.includes('company') || lowerMessage.includes('history')) {
            return "🏢 MWAMAR has been crafting quality wooden furniture since 2000 in Zambia. We specialize in:<br>• Handcrafted hardwood furniture<br>• Traditional Zambian craftsmanship<br>• Sustainable sourcing<br>• Supporting local artisans<br><br>25+ years of excellence in furniture making!";
        }
        
        // Delivery/shipping
        if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping') || lowerMessage.includes('transport')) {
            return "🚚 We offer delivery services in Lusaka and surrounding areas. For delivery details and costs, please contact us at 0974738105. We ensure safe transport of all furniture pieces!";
        }
        
        // Materials
        if (lowerMessage.includes('wood') || lowerMessage.includes('material') || lowerMessage.includes('quality')) {
            return "🌳 We use only premium locally-sourced Zambian hardwoods:<br>• Sustainable sourcing practices<br>• Hand-finished with care<br>• Built to last generations<br>• Natural wood grains and textures<br><br>Each piece showcases the beauty of African hardwood!";
        }
        
        // Greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "👋 Hello! I'm Mikal, your personal furniture assistant at MWAMAR. Welcome to your premier destination for handcrafted wooden furniture in Zambia. How can I help you find the perfect piece for your home today?";
        }
        
        // Default response
        return "🤔 Hi! I'm Mikal, and I'd be happy to help you with information about our furniture, pricing, custom orders, or contact details. You can also call us directly at 0974738105 for immediate assistance!<br><br>Try asking about:<br>• Our furniture products<br>• Pricing information<br>• Custom orders<br>• Contact details";
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new MwamarChatbot();
});
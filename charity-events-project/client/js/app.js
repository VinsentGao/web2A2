// API Base URL
const API_BASE_URL = 'http://localhost:3000/api';

// Common utility functions
class CharityApp {
    // Format date to readable string
    static formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Format time to readable string
    static formatTime(timeString) {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    // Format currency
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    // Calculate progress percentage
    static calculateProgress(current, goal) {
        if (goal === 0) return 0;
        return Math.min(Math.round((current / goal) * 100), 100);
    }

    // Show loading state
    static showLoading(container) {
        container.innerHTML = '<div class="loading">Loading...</div>';
    }

    // Show error message
    static showError(container, message) {
        container.innerHTML = `
            <div class="error-message">
                <strong>Error:</strong> ${message}
            </div>
        `;
    }

    // Make API request with error handling
    static async makeApiRequest(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw new Error('Failed to fetch data from server. Please check if the API server is running.');
        }
    }

    // Create event card HTML
    static createEventCard(event) {
        const progress = this.calculateProgress(event.current_progress, event.fundraising_goal);
        
        return `
            <div class="event-card" data-event-id="${event.id}">
                <div class="event-image">
                    ${event.image_url ? 
                        `<img src="${event.image_url}" alt="${event.title}" style="width:100%;height:100%;object-fit:cover;">` : 
                        '🎗️ Charity Event'
                    }
                </div>
                <div class="event-content">
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-meta">
                        <span>📅 ${this.formatDate(event.event_date)}</span><br>
                        <span>📍 ${event.location}</span><br>
                        <span>🏷️ ${event.category_name || 'General'}</span>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-price">
                        ${event.ticket_price > 0 ? 
                            `Ticket: ${this.formatCurrency(event.ticket_price)}` : 
                            'Free Entry'
                        }
                    </div>
                    ${event.fundraising_goal > 0 ? `
                        <div class="fundraising-progress">
                            <strong>Fundraising Progress:</strong>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                            <div class="progress-text">
                                ${this.formatCurrency(event.current_progress)} / ${this.formatCurrency(event.fundraising_goal)} (${progress}%)
                            </div>
                        </div>
                    ` : ''}
                    <button class="view-details-btn" onclick="CharityApp.viewEventDetails(${event.id})">
                        View Details
                    </button>
                </div>
            </div>
        `;
    }

    // Navigate to event details page
    static viewEventDetails(eventId) {
        window.location.href = `event-details.html?id=${eventId}`;
    }

    // Get URL parameter
    static getUrlParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Initialize modal functionality
    static initModal() {
        const modal = document.getElementById('register-modal');
        const closeBtn = document.querySelector('.close-button');
        const closeModalBtn = document.getElementById('close-modal');

        if (modal && closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            }

            if (closeModalBtn) {
                closeModalBtn.onclick = function() {
                    modal.style.display = 'none';
                }
            }

            window.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            }
        }
    }

    // Show registration modal
    static showRegistrationModal() {
        const modal = document.getElementById('register-modal');
        if (modal) {
            modal.style.display = 'flex';
        } else {
            alert('This feature is currently under construction.');
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    CharityApp.initModal();
});
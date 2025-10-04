class EventDetailsPage {
    constructor() {
        this.detailsContainer = document.getElementById('event-details-container');
        this.eventId = CharityApp.getUrlParam('id');
        
        if (!this.eventId) {
            this.showError('No event ID provided');
            return;
        }
        
        this.init();
    }

    async init() {
        await this.loadEventDetails();
        this.setupEventListeners();
    }

    async loadEventDetails() {
        try {
            CharityApp.showLoading(this.detailsContainer);
            
            const event = await CharityApp.makeApiRequest(`/events/${this.eventId}`);
            this.displayEventDetails(event);
        } catch (error) {
            this.showError(error.message);
        }
    }

    displayEventDetails(event) {
        const progress = CharityApp.calculateProgress(event.current_progress, event.fundraising_goal);
        
        this.detailsContainer.innerHTML = `
            <div class="event-details">
                <div class="event-header">
                    <h2>${event.title}</h2>
                    <div class="event-meta-details">
                        <p>📅 ${CharityApp.formatDate(event.event_date)} at ${CharityApp.formatTime(event.event_time)}</p>
                        <p>📍 ${event.location} ${event.venue_details ? `- ${event.venue_details}` : ''}</p>
                        <p>🏷️ ${event.category_name || 'General'} • Hosted by ${event.organization_name || 'Heart Charity'}</p>
                    </div>
                </div>
                
                <div class="event-body">
                    <div class="event-description-full">
                        <h3>About This Event</h3>
                        <p>${event.full_description || event.description}</p>
                        
                        ${event.venue_details ? `
                            <h3>Venue Details</h3>
                            <p>${event.venue_details}</p>
                        ` : ''}
                    </div>
                    
                    <div class="event-info-sidebar">
                        <div class="info-item">
                            <h4>📅 Date & Time</h4>
                            <p>${CharityApp.formatDate(event.event_date)}<br>
                            ${CharityApp.formatTime(event.event_time)}</p>
                        </div>
                        
                        <div class="info-item">
                            <h4>📍 Location</h4>
                            <p>${event.location}</p>
                        </div>
                        
                        <div class="info-item">
                            <h4>🎫 Ticket Information</h4>
                            <p><strong>${event.ticket_price > 0 ? 
                                CharityApp.formatCurrency(event.ticket_price) : 
                                'Free Entry'
                            }</strong></p>
                        </div>
                        
                        ${event.fundraising_goal > 0 ? `
                            <div class="info-item">
                                <h4>💰 Fundraising Goal</h4>
                                <p><strong>${CharityApp.formatCurrency(event.current_progress)} raised</strong><br>
                                of ${CharityApp.formatCurrency(event.fundraising_goal)} goal</p>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${progress}%"></div>
                                </div>
                                <p class="progress-text">${progress}% funded</p>
                            </div>
                        ` : ''}
                        
                        <button class="register-button" onclick="CharityApp.showRegistrationModal()">
                            Register for Event
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Additional event listeners can be added here if needed
    }

    showError(message) {
        CharityApp.showError(this.detailsContainer, message);
    }
}

// Initialize event details page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new EventDetailsPage();
});
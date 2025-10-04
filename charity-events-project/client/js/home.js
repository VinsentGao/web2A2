class HomePage {
    constructor() {
        this.eventsContainer = document.getElementById('events-container');
        this.init();
    }

    async init() {
        await this.loadHomepageEvents();
    }

    async loadHomepageEvents() {
        try {
            CharityApp.showLoading(this.eventsContainer);
            
            const events = await CharityApp.makeApiRequest('/events/home');
            
            if (events.length === 0) {
                this.eventsContainer.innerHTML = `
                    <div class="no-results">
                        <h3>No upcoming events found</h3>
                        <p>Check back later for new charity events!</p>
                    </div>
                `;
                return;
            }

            this.displayEvents(events);
        } catch (error) {
            CharityApp.showError(this.eventsContainer, error.message);
        }
    }

    displayEvents(events) {
        this.eventsContainer.innerHTML = events.map(event => 
            CharityApp.createEventCard(event)
        ).join('');
    }
}

// Initialize home page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new HomePage();
});
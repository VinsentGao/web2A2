class SearchPage {
    constructor() {
        this.searchForm = document.getElementById('search-form');
        this.resultsContainer = document.getElementById('results-container');
        this.errorMessage = document.getElementById('error-message');
        this.categorySelect = document.getElementById('category');
        this.clearButton = document.getElementById('clear-filters');
        
        this.init();
    }

    async init() {
        await this.loadCategories();
        this.setupEventListeners();
    }

    async loadCategories() {
        try {
            const categories = await CharityApp.makeApiRequest('/categories');
            
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.name;
                option.textContent = category.name;
                this.categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    }

    setupEventListeners() {
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.performSearch();
        });

        this.clearButton.addEventListener('click', () => {
            this.clearFilters();
        });
    }

    async performSearch() {
        const formData = new FormData(this.searchForm);
        const searchParams = new URLSearchParams();
        
        // Add non-empty search parameters
        if (formData.get('date')) searchParams.append('date', formData.get('date'));
        if (formData.get('location')) searchParams.append('location', formData.get('location'));
        if (formData.get('category')) searchParams.append('category', formData.get('category'));

        try {
            CharityApp.showLoading(this.resultsContainer);
            this.hideError();

            const events = await CharityApp.makeApiRequest(`/events/search?${searchParams}`);
            
            if (events.length === 0) {
                this.resultsContainer.innerHTML = `
                    <div class="no-results">
                        <h3>No events found</h3>
                        <p>Try adjusting your search criteria</p>
                    </div>
                `;
                return;
            }

            this.displaySearchResults(events);
        } catch (error) {
            this.showError(error.message);
        }
    }

    displaySearchResults(events) {
        this.resultsContainer.innerHTML = events.map(event => 
            CharityApp.createEventCard(event)
        ).join('');
    }

    clearFilters() {
        this.searchForm.reset();
        this.resultsContainer.innerHTML = '<div class="no-results">Use the form above to search for events</div>';
        this.hideError();
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.resultsContainer.innerHTML = '';
    }

    hideError() {
        this.errorMessage.style.display = 'none';
    }
}

// Initialize search page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new SearchPage();
});
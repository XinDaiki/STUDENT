document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    // Animation for widgets as they enter the viewport
    function animateWidgetsOnScroll() {
      const widgets = document.querySelectorAll('.widget');
  
      widgets.forEach(widget => {
        if (isInViewport(widget) && !widget.classList.contains('animated')) {
          widget.classList.add('animated');
          widget.style.opacity = '0';
          widget.style.transform = 'translateY(20px)';
  
          setTimeout(() => {
            widget.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            widget.style.opacity = '1';
            widget.style.transform = 'translateY(0)';
          }, 100 * (Array.from(widgets).indexOf(widget) % 5)); // Staggered animation
        }
      });
    }
  
    // Update widget visibility based on user preferences
    function updateWidgetVisibility() {
      const widgets = {
        'calendarWidget': document.querySelector('.calendar-widget'),
        'upcomingWidget': document.querySelector('.upcoming-widget'),
        'gradesWidget': document.querySelector('.grades-widget'),
        'announcementsWidget': document.querySelector('.announcements-widget'),
        'balanceWidget': document.querySelector('.balance-widget')
      };
  
      // Get saved preferences from localStorage or default to all visible
      const preferences = JSON.parse(localStorage.getItem('widgetPreferences')) || {
        'calendarWidget': true,
        'upcomingWidget': true,
        'gradesWidget': true,
        'announcementsWidget': true,
        'balanceWidget': true
      };
  
      // Update widget visibility
      for (const [id, widget] of Object.entries(widgets)) {
        if (widget) {
          widget.style.display = preferences[id] ? 'block' : 'none';
        }
      }
  
      // Update checkboxes in widget config modal
      for (const [id, visible] of Object.entries(preferences)) {
        const checkbox = document.getElementById(id);
        if (checkbox) checkbox.checked = visible;
      }
    }
  
    // Setup event handlers for widget configuration
    function setupWidgetConfigHandlers() {
      const configBtn = document.querySelector('.widget-config-btn');
      const widgetModal = document.getElementById('widgetModal');
      const closeWidgetModal = document.getElementById('closeWidgetModal');
      const cancelWidgetModal = document.getElementById('cancelWidgetModal');
      const saveWidgets = document.getElementById('saveWidgets');
  
      if (configBtn) {
        configBtn.addEventListener('click', function() {
          widgetModal.classList.remove('hidden');
        });
      }
  
      if (closeWidgetModal) {
        closeWidgetModal.addEventListener('click', function() {
          widgetModal.classList.add('hidden');
        });
      }
  
      if (cancelWidgetModal) {
        cancelWidgetModal.addEventListener('click', function() {
          widgetModal.classList.add('hidden');
        });
      }
  
      if (saveWidgets) {
        saveWidgets.addEventListener('click', function() {
          // Save widget preferences
          const preferences = {
            'calendarWidget': document.getElementById('calendarWidget').checked,
            'upcomingWidget': document.getElementById('upcomingWidget').checked,
            'gradesWidget': document.getElementById('gradesWidget').checked,
            'announcementsWidget': document.getElementById('announcementsWidget').checked,
            'balanceWidget': document.getElementById('balanceWidget').checked
          };
  
          localStorage.setItem('widgetPreferences', JSON.stringify(preferences));
          updateWidgetVisibility();
          widgetModal.classList.add('hidden');
        });
      }
    }
  
    // Update dashboard data (in a real app, this would fetch from an API)
    function updateDashboardData() {
      // For demo, we're using mock data
      // Current date
      const currentDate = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateString = currentDate.toLocaleDateString('en-US', options);
  
      const dateDisplays = document.querySelectorAll('.current-date');
      dateDisplays.forEach(el => {
        if (el) el.textContent = dateString;
      });
  
      // Last updated time
      const timeString = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const timeDisplays = document.querySelectorAll('.update-msg');
      timeDisplays.forEach(el => {
        if (el) el.textContent = `Last updated: ${timeString}`;
      });
    }
  
    // Call functions for dashboard initialization
    if (document.getElementById('contentContainer')) {
      // Listen for scroll events for animations
      window.addEventListener('scroll', animateWidgetsOnScroll);
  
      // Setup widget configuration
      setupWidgetConfigHandlers();
  
      // Initial update of widget visibility
      updateWidgetVisibility();
  
      // Update dashboard data
      updateDashboardData();
  
      // Initial animation check
      setTimeout(animateWidgetsOnScroll, 100);
    }
  });
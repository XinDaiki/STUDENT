// Calendar and Deadline Utilities
document.addEventListener('DOMContentLoaded', function() {
    // Update timestamps
    function updateTime() {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      
      const timeDisplays = document.querySelectorAll('.update-msg');
      timeDisplays.forEach(display => {
        if (display) {
          display.textContent = `Last updated: ${timeString}`;
        }
      });
    }
  
    // Calculate days between dates
    function getDaysBetween(date1, date2) {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
      return diffDays;
    }
  
    // Update deadlines with gap information
    function updateDeadlines() {
      const listItems = document.querySelectorAll('.list-item');
      const now = new Date();
  
      listItems.forEach(item => {
        const deadlineText = item.querySelector('.list-item-secondary').textContent;
        const deadlineDate = new Date(deadlineText.replace('Due: ', ''));
        const daysGap = getDaysBetween(now, deadlineDate);
        
        const gapInfo = document.createElement('div');
        gapInfo.className = 'deadline-gap';
        gapInfo.textContent = `${daysGap} days remaining`;
        
        // Remove existing gap info if any
        const existingGap = item.querySelector('.deadline-gap');
        if (existingGap) {
          existingGap.remove();
        }
        
        item.appendChild(gapInfo);
      });
    }
  
    // Update time every minute
    setInterval(updateTime, 60000);
    updateTime();
    
    // Update deadlines initially and every hour
    updateDeadlines();
    setInterval(updateDeadlines, 3600000);
  });
  

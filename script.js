document.addEventListener('DOMContentLoaded', function() {
  // Login Form Handler
  const loginForm = document.getElementById('loginForm');
  const loginContainer = document.getElementById('loginContainer');
  const mainContainer = document.getElementById('mainContainer');
  const userDisplay = document.getElementById('userDisplay');
  const logoutBtn = document.getElementById('logoutBtn');

  // Modal Elements
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const cancelModal = document.getElementById('cancelModal');
  const confirmModal = document.getElementById('confirmModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const modalIcon = document.getElementById('modalIcon');

  // Profile Avatar Elements
  const profileAvatar = document.getElementById('profileAvatar');
  const avatarModal = document.getElementById('avatarModal');
  const closeAvatarModal = document.getElementById('closeAvatarModal');
  const cancelAvatarModal = document.getElementById('cancelAvatarModal');
  const saveAvatar = document.getElementById('saveAvatar');
  const avatarOptions = document.querySelectorAll('.avatar-option');

  // Theme Toggle
  const themeSwitch = document.getElementById('themeSwitch');

  // Navigation Tree
  const carets = document.querySelectorAll('.caret');
  const menuItems = document.querySelectorAll('.menu-item');
  const contentTitle = document.getElementById('contentTitle');
  const contentContainer = document.getElementById('contentContainer');

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // In a real app, this would validate credentials against a server
      // For demo, we just check that fields aren't empty
      if (username.trim() && password.trim()) {
        loginContainer.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        userDisplay.textContent = `Welcome, ${username}`;

        // Show chatbot after login
        const chatbotContainer = document.querySelector('.chatbot-container');
        if (chatbotContainer) {
          chatbotContainer.style.display = 'block';
        }

        // Generate dashboard content on login
        updateContent('Dashboard', 'dashboard');
      }
    });
  }

  // Modal Close Handlers
  function closeModalFunction() {
    modal.classList.add('hidden');
  }

  if (closeModal) {
    closeModal.addEventListener('click', closeModalFunction);
  }

  if (cancelModal) {
    cancelModal.addEventListener('click', closeModalFunction);
  }

  // Handle Log Out
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      loginContainer.classList.remove('hidden');
      mainContainer.classList.add('hidden');
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
    });
  }

  // Update Content Function
  function updateContent(title, contentId) {
    if (contentTitle) {
      // Set appropriate icon for the content title
      const iconClass = getIconForContentId(contentId);
      contentTitle.innerHTML = `<i class="${iconClass}"></i> ${title}`;
    }

    if (contentContainer) {
      // Clear current active menu item
      document.querySelectorAll('.active-item').forEach(item => {
        if (!item.classList.contains('caret')) {
          item.classList.remove('active-item');
        }
      });

      // Set new active menu item
      const newActiveItem = document.querySelector(`[data-content-id="${contentId}"]`);
      if (newActiveItem) {
        newActiveItem.classList.add('active-item');
      }

      // Generate content based on contentId
      contentContainer.innerHTML = generateContent(contentId);
    }
  }

  // Handle Modal Opening
  function openModal(title, contentId) {
    modalTitle.innerHTML = `<i id="modalIcon" class="${getModalIconClass(contentId)}"></i> ${title}`;
    modalContent.innerHTML = generateModalContent(contentId);

    // Set the confirm button text based on the modal type
    confirmModal.textContent = getModalAction(contentId);

    modal.classList.remove('hidden');
  }

  // Get Icon Class for Modal Title
  function getModalIconClass(contentId) {
    const iconMap = {
      'payment-center': 'fas fa-credit-card',
      'grade-completion': 'fas fa-tasks',
      'change-password': 'fas fa-key',
      'student-maintenance': 'fas fa-user-edit',
      'default': 'fas fa-info-circle'
    };

    return iconMap[contentId] || iconMap['default'];
  }

  // Get Action Text for Modal Confirm Button
  function getModalAction(contentId) {
    const actionMap = {
      'payment-center': 'Process Payment',
      'grade-completion': 'Submit Request',
      'change-password': 'Update Password',
      'student-maintenance': 'Save Changes',
      'default': 'Confirm'
    };

    return actionMap[contentId] || actionMap['default'];
  }

  // Generate Content Based on Content ID
  function generateContent(contentId) {
    if (contentId === 'dashboard') {
      return generateDashboardContent();
    } else if (contentId === 'grade-display') {
      return generateHSGSGradeDisplay();
    } else if (contentId === 'online-enrollment') {
      return generateOnlineEnrollment();
    } else if (contentId === 'schedule-inquiry') {
      return generateScheduleInquiry();
    } else if (contentId === 'current-enrollment') {
      return generateCurrentEnrollment();
    } else if (contentId === 'grades-display') {
      return generateCollegeGradesDisplay();
    } else if (contentId === 'grade-completion') {
      return generateGradeCompletionRequest();
    } else if (contentId === 'change-password') {
      return generateChangePassword();
    } else if (contentId === 'profile-settings') {
      return generateProfileSettings();
    }

    // For other sections, return placeholder content
    return `
      <div class="content-placeholder">
        <div class="info-box">
          <i class="fas fa-info-circle"></i>
          <div>
            <p>This is a demonstration of the <strong>${contentId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong> section.</p>
            <p>In a complete implementation, this would contain actual data and functionality.</p>
          </div>
        </div>

        <p>You selected the <strong>${contentId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong> option. This is where the content for this section would be displayed.</p>

        <button class="widget-config-btn" onclick="openModal('${contentId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}', '${contentId}')">
          <i class="${getIconForContentId(contentId)}"></i> Open ${contentId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </button>
      </div>
    `;
  }

  // Generate HS/GS Latest Grade Display
  function generateHSGSGradeDisplay() {
    return `
      <div class="content-section">
        <div class="info-box">
          <i class="fas fa-info-circle"></i>
          <div>
            <p>Below are your latest grades for the current semester (2025 Spring).</p>
          </div>
        </div>

        <h3 class="content-subtitle">High School/Grade School Grades</h3>

        <table class="modal-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>1st Quarter</th>
              <th>2nd Quarter</th>
              <th>3rd Quarter</th>
              <th>4th Quarter</th>
              <th>Final Grade</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mathematics</td>
              <td>94</td>
              <td>92</td>
              <td>91</td>
              <td>93</td>
              <td>92.5</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
            <tr>
              <td>Science</td>
              <td>89</td>
              <td>91</td>
              <td>90</td>
              <td>93</td>
              <td>90.75</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
            <tr>
              <td>English</td>
              <td>95</td>
              <td>94</td>
              <td>96</td>
              <td>97</td>
              <td>95.5</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
            <tr>
              <td>Filipino</td>
              <td>92</td>
              <td>90</td>
              <td>91</td>
              <td>93</td>
              <td>91.5</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
            <tr>
              <td>Social Studies</td>
              <td>88</td>
              <td>90</td>
              <td>91</td>
              <td>93</td>
              <td>90.5</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
            <tr>
              <td>Physical Education</td>
              <td>95</td>
              <td>96</td>
              <td>97</td>
              <td>98</td>
              <td>96.5</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
            <tr>
              <td>Music</td>
              <td>94</td>
              <td>95</td>
              <td>93</td>
              <td>95</td>
              <td>94.25</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
            <tr>
              <td>Arts</td>
              <td>96</td>
              <td>95</td>
              <td>94</td>
              <td>96</td>
              <td>95.25</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="5">General Weighted Average</td>
              <td>93.34</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
          </tfoot>
        </table>

        <div class="buttons-container" style="margin-top: 20px;">
          <button class="widget-config-btn">
            <i class="fas fa-print"></i> Print Report Card
          </button>
          <button class="widget-config-btn">
            <i class="fas fa-file-pdf"></i> Save as PDF
          </button>
        </div>

        <div class="update-msg" style="margin-top: 10px;">Last updated: April 2, 2025</div>
      </div>
    `;
  }

  // Generate Online Enrollment
  function generateOnlineEnrollment() {
    return `
      <div class="content-section">
        <div class="info-box">
          <i class="fas fa-info-circle"></i>
          <div>
            <p>Welcome to the Online Enrollment System. Please follow the steps below to complete your enrollment for the upcoming semester.</p>
          </div>
        </div>

        <div class="enrollment-progress">
          <div class="progress-step active">
            <div class="step-number">1</div>
            <div class="step-label">Student Information</div>
          </div>
          <div class="progress-connector"></div>
          <div class="progress-step">
            <div class="step-number">2</div>
            <div class="step-label">Subject Selection</div>
          </div>
          <div class="progress-connector"></div>
          <div class="progress-step">
            <div class="step-number">3</div>
            <div class="step-label">Assessment</div>
          </div>
          <div class="progress-connector"></div>
          <div class="progress-step">
            <div class="step-number">4</div>
            <div class="step-label">Payment</div>
          </div>
          <div class="progress-connector"></div>
          <div class="progress-step">
            <div class="step-number">5</div>
            <div class="step-label">Confirmation</div>
          </div>
        </div>

        <div class="enrollment-form" style="margin-top: 30px;">
          <h3 class="form-title">Step 1: Student Information</h3>

          <div class="form-section">
            <div class="form-row">
              <div class="form-group">
                <label for="studentId">Student ID</label>
                <input type="text" id="studentId" value="2023-12345" disabled>
              </div>
              <div class="form-group">
                <label for="enrollmentType">Enrollment Type</label>
                <select id="enrollmentType">
                  <option value="regular">Regular</option>
                  <option value="irregular">Irregular</option>
                  <option value="transferee">Transferee</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" value="John">
              </div>
              <div class="form-group">
                <label for="middleName">Middle Name</label>
                <input type="text" id="middleName" value="Michael">
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" value="Smith">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="birthdate">Birthdate</label>
                <input type="date" id="birthdate" value="2000-05-15">
              </div>
              <div class="form-group">
                <label for="gender">Gender</label>
                <select id="gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <label for="address">Complete Address</label>
                <input type="text" id="address" value="123 Main Street, Anytown, CA 12345">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="emailAddress">Email Address</label>
                <input type="email" id="emailAddress" value="john.smith@example.com">
              </div>
              <div class="form-group">
                <label for="contactNumber">Contact Number</label>
                <input type="tel" id="contactNumber" value="(555) 123-4567">
              </div>
            </div>
          </div>

          <div class="buttons-container">
            <button class="widget-config-btn">
              <i class="fas fa-arrow-right"></i> Next: Subject Selection
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Generate Subject Schedule Inquiry
  function generateScheduleInquiry() {
    return `
      <div class="content-section">
        <div class="info-box">
          <i class="fas fa-info-circle"></i>
          <div>
            <p>You can view your class schedule for the current semester (2025 Spring) below.</p>
          </div>
        </div>

        <div class="schedule-filters" style="margin-bottom: 20px;">
          <div class="form-row">
            <div class="form-group">
              <label for="scheduleDay">Filter by Day</label>
              <select id="scheduleDay">
                <option value="all">All Days</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
            <div class="form-group">
              <label for="scheduleSubject">Filter by Subject</label>
              <select id="scheduleSubject">
                <option value="all">All Subjects</option>
                <option value="math">Mathematics 101</option>
                <option value="physics">Physics 201</option>
                <option value="english">English Literature</option>
                <option value="cs">Computer Science</option>
                <option value="pe">Physical Education</option>
              </select>
            </div>
          </div>
        </div>

        <table class="modal-table">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Description</th>
              <th>Section</th>
              <th>Units</th>
              <th>Schedule</th>
              <th>Room</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MATH101</td>
              <td>Mathematics 101</td>
              <td>A</td>
              <td>3</td>
              <td>MWF 9:00AM - 10:30AM</td>
              <td>Room 301</td>
              <td>Prof. Ariana-Butera</td>
            </tr>
            <tr>
              <td>PHYS201</td>
              <td>Physics 201</td>
              <td>B</td>
              <td>4</td>
              <td>TTh 11:00AM - 12:30PM</td>
              <td>Room 405</td>
              <td>Dr. Abel-Tesfaye</td>
            </tr>
            <tr>
              <td>ENGL150</td>
              <td>English Literature</td>
              <td>A</td>
              <td>3</td>
              <td>MWF 1:00PM - 2:30PM</td>
              <td>Room 204</td>
              <td>Prof. Aubrey-Graham</td>
            </tr>
            <tr>
              <td>COMP220</td>
              <td>Computer Science</td>
              <td>C</td>
              <td>4</td>
              <td>TTh 3:00PM - 4:30PM</td>
              <td>Lab 101</td>
              <td>Dr. Elizabeth-Grant</td>
            </tr>
            <tr>
              <td>PE100</td>
              <td>Physical Education</td>
              <td>B</td>
              <td>2</td>
              <td>F 3:00PM - 5:00PM</td>
              <td>Gymnasium</td>
              <td>Coach Ashton-Simmonds</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Total Units</td>
              <td>16</td>
              <td colspan="3"></td>
            </tr>
          </tfoot>
        </table>

        <div class="weekly-schedule" style="margin-top: 30px;">
          <h3 class="content-subtitle">Weekly Schedule View</h3>
          <div class="weekly-table-container">
            <table class="schedule-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>8:00 - 9:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>9:00 - 10:30</td>
                  <td class="scheduled-class math-class">MATH101<br>Room 301</td>
                  <td></td>
                  <td class="scheduled-class math-class">MATH101<br>Room 301</td>
                  <td></td>
                  <td class="scheduled-class math-class">MATH101<br>Room 301</td>
                </tr>
                <tr>
                  <td>10:30 - 11:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>11:00 - 12:30</td>
                  <td></td>
                  <td class="scheduled-class physics-class">PHYS201<br>Room 405</td>
                  <td></td>
                  <td class="scheduled-class physics-class">PHYS201<br>Room 405</td>
                  <td></td>
                </tr>
                <tr>
                  <td>12:30 - 1:00</td>
                  <td colspan="5" class="break-time">LUNCH BREAK</td>
                </tr>
                <tr>
                  <td>1:00 - 2:30</td>
                  <td class="scheduled-class english-class">ENGL150<br>Room 204</td>
                  <td></td>
                  <td class="scheduled-class english-class">ENGL150<br>Room 204</td>
                  <td></td>
                  <td class="scheduled-class english-class">ENGL150<br>Room 204</td>
                </tr>
                <tr>
                  <td>2:30 - 3:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3:00 - 4:30</td>
                  <td></td>
                  <td class="scheduled-class cs-class">COMP220<br>Lab 101</td>
                  <td></td>
                  <td class="scheduled-class cs-class">COMP220<br>Lab 101</td>
                  <td class="scheduled-class pe-class" rowspan="2">PE100<br>Gymnasium</td>
                </tr>
                <tr>
                  <td>4:30 - 5:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="buttons-container" style="margin-top: 20px;">
          <button class="widget-config-btn">
            <i class="fas fa-print"></i> Print Schedule
          </button>
          <button class="widget-config-btn">
            <i class="fas fa-file-pdf"></i> Save as PDF
          </button>
          <button class="widget-config-btn">
            <i class="fas fa-calendar-plus"></i> Add to Calendar
          </button>
        </div>
      </div>
    `;
  }

  // Generate Current Enrollment
  function generateCurrentEnrollment() {
    return `
      <div class="content-section">
        <div class="info-box">
          <i class="fas fa-info-circle"></i>
          <div>
            <p>Below is your current enrollment information for the semester (2025 Spring).</p>
          </div>
        </div>

        <div class="enrollment-info-card">
          <div class="enrollment-header">
            <h3>Enrollment Details</h3>
            <span class="status-pill status-paid">Enrolled</span>
          </div>

          <div class="enrollment-details">
            <div class="detail-row">
              <div class="detail-label">Student ID:</div>
              <div class="detail-value">2023-12345</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Name:</div>
              <div class="detail-value">Smith, John Michael</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Program:</div>
              <div class="detail-value">Bachelor of Science in Computer Science</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Year Level:</div>
              <div class="detail-value">2nd Year</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Semester:</div>
              <div class="detail-value">2nd Semester, AY 2024-2025</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Enrollment Type:</div>
              <div class="detail-value">Regular</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Enrollment Date:</div>
              <div class="detail-value">January 15, 2025</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Total Units:</div>
              <div class="detail-value">16</div>
            </div>
          </div>
        </div>

        <h3 class="content-subtitle" style="margin-top: 30px;">Enrolled Subjects</h3>

        <table class="modal-table">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Description</th>
              <th>Section</th>
              <th>Units</th>
              <th>Schedule</th>
              <th>Room</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MATH101</td>
              <td>Mathematics 101</td>
              <td>A</td>
              <td>3</td>
              <td>MWF 9:00AM - 10:30AM</td>
              <td>Room 301</td>
              <td>Prof. Ariana-Butera</td>
            </tr>
            <tr>
              <td>PHYS201</td>
              <td>Physics 201</td>
              <td>B</td>
              <td>4</td>
              <td>TTh 11:00AM - 12:30PM</td>
              <td>Room 405</td>
              <td>Dr. Abel-Tesfaye</td>
            </tr>
            <tr>
              <td>ENGL150</td>
              <td>English Literature</td>
              <td>A</td>
              <td>3</td>
              <td>MWF 1:00PM - 2:30PM</td>
              <td>Room 204</td>
              <td>Prof. Aubrey-Graham</td>
            </tr>
            <tr>
              <td>COMP220</td>
              <td>Computer Science</td>
              <td>C</td>
              <td>4</td>
              <td>TTh 3:00PM - 4:30PM</td>
              <td>Lab 101</td>
              <td>Dr. Elizabeth-Grant</td>
            </tr>
            <tr>
              <td>PE100</td>
              <td>Physical Education</td>
              <td>B</td>
              <td>2</td>
              <td>F 3:00PM - 5:00PM</td>
              <td>Gymnasium</td>
              <td>Coach Ashton-Simmonds</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Total Units</td>
              <td>16</td>
              <td colspan="3"></td>
            </tr>
          </tfoot>
        </table>

        <div class="buttons-container" style="margin-top: 20px;">
          <button class="widget-config-btn">
            <i class="fas fa-print"></i> Print Registration
          </button>
          <button class="widget-config-btn">
            <i class="fas fa-file-pdf"></i> Download Certificate of Registration
          </button>
        </div>
      </div>
    `;
  }

  // Generate College Grades Display
  function generateCollegeGradesDisplay() {
    return `
      <div class="content-section">
        <div class="info-box">
          <i class="fas fa-info-circle"></i>
          <div>
            <p>Below are your grades for the current semester (2025 Spring).</p>
          </div>
        </div>

        <div class="form-row" style="margin-bottom: 20px;">
          <div class="form-group">
            <label for="semesterSelect">Select Semester</label>
            <select id="semesterSelect">
              <option value="2025-2">Spring 2025 (Current)</option>
              <option value="2025-1">Fall 2024</option>
              <option value="2024-2">Spring 2024</option>
              <option value="2024-1">Fall 2023</option>
            </select>
          </div>
        </div>

        <table class="modal-table">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Description</th>
              <th>Units</th>
              <th>Midterm</th>
              <th>Final</th>
              <th>Grade</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MATH101</td>
              <td>Mathematics 101</td>
              <td>3</td>
              <td>92</td>
              <td>93</td>
              <td>92.5 (A)</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
            <tr>
              <td>PHYS201</td>
              <td>Physics 201</td>
              <td>4</td>
              <td>87</td>
              <td>89</td>
              <td>88.0 (B+)</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
            <tr>
              <td>ENGL150</td>
              <td>English Literature</td>
              <td>3</td>
              <td>94</td>
              <td>96</td>
              <td>95.0 (A)</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
            <tr>
              <td>COMP220</td>
              <td>Computer Science</td>
              <td>4</td>
              <td>91</td>
              <td>89</td>
              <td>90.0 (A-)</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
            <tr>
              <td>PE100</td>
              <td>Physical Education</td>
              <td>2</td>
              <td>97</td>
              <td>99</td>
              <td>98.0 (A+)</td>
              <td><span class="status-pill status-paid">Passed</span></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">Semester GPA</td>
              <td>16</td>
              <td colspan="2"></td>
              <td>92.7 (A)</td>
              <td></td>
            </tr>
          </tfoot>
        </table>

        <div class="buttons-container" style="margin-top: 20px;">
          <button class="widget-config-btn">
            <i class="fas fa-print"></i> Print Grade Report
          </button>
          <button class="widget-config-btn">
            <i class="fas fa-file-pdf"></i> Download Transcript
          </button>
        </div>
      </div>
    `;
  }

  // Generate Grade Completion Request
  function generateGradeCompletionRequest() {
    return `
      <div class="content-section">
        <div class="info-box">
          <i class="fas fa-info-circle"></i>
          <div>
            <p>Use this form to request grade completion for subjects with incomplete marks.</p>
          </div>
        </div>

        <div class="alert-box">
          <i class="fas fa-exclamation-circle"></i>
          <div>
            <p><strong>Important Notice:</strong></p>
            <p>Grade completion requests must be submitted within 30 days of grade posting. Processing may take up to 5 working days.</p>
          </div>
        </div>

        <div class="grade-completion-form" style="margin-top: 30px;">
          <h3 class="form-title">Grade Completion Request Form</h3>

          <div class="form-section">
            <div class="form-row">
              <div class="form-group">
                <label for="subjectSelect">Select Subject</label>
                <select id="subjectSelect">
                  <option value="">-- Select a subject --</option>
                  <option value="math">Mathematics 101</option>
                  <option value="physics">Physics 201</option>
                  <option value="english">English Literature</option>
                  <option value="cs">Computer Science</option>
                </select>
              </div>
              <div class="form-group">
                <label for="semesterSelect">Semester & Year</label>
                <select id="semesterSelect">
                  <option value="2025">2025 (Current)</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="instructorName">Instructor Name</label>
                <input type="text" id="instructorName" placeholder="Enter instructor name">
              </div>
              <div class="form-group">
                <label for="submissionDate">Request Submission Date</label>
                <input type="date" id="submissionDate" value="${new Date().toISOString().split('T')[0]}">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="reasonSelect">Reason for Request</label>
                <select id="reasonSelect">
                  <option value="">-- Select a reason --</option>
                  <option value="incomplete">Incomplete Requirements</option>
                  <option value="missed">Missed Final Examination</option>
                  <option value="error">Error in Grade Entry</option>
                  <option value="other">Other (Specify Below)</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <label for="requestDetails">Details of Request</label>
                <textarea id="requestDetails" rows="4" placeholder="Please provide detailed information about your grade completion request"></textarea>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <label for="supportingDocs">Supporting Documents (if any)</label>
                <div class="file-upload-container">
                  <button class="file-upload-btn">
                    <i class="fas fa-cloud-upload-alt"></i> Upload Files
                  </button>
                  <span class="file-upload-text">No files selected</span>
                </div>
                <div class="file-upload-note">Accepted formats: PDF, JPG, PNG (Max size: 5MB per file)</div>
              </div>
            </div>
          </div>

          <div class="buttons-container">
            <button class="widget-config-btn" style="background-color: #e0e0e0; color: #546e7a;">
              <i class="fas fa-save"></i> Save Draft
            </button>
            <button class="widget-config-btn">
              <i class="fas fa-paper-plane"></i> Submit Request
            </button>
          </div>
        </div>

        <div class="previous-requests" style="margin-top: 40px;">
          <h3 class="content-subtitle">Previous Requests</h3>

          <table class="modal-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Subject</th>
                <th>Semester</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>REQ-2024-001</td>
                <td>Computer Science</td>
                <td>Fall 2024</td>
                <td>Dec 20, 2024</td>
                <td><span class="status-pill status-paid">Approved</span></td>
                <td><button class="action-btn"><i class="fas fa-eye"></i> View</button></td>
              </tr>
              <tr>
                <td>REQ-2024-002</td>
                <td>Physics 201</td>
                <td>Fall 2024</td>
                <td>Dec 15, 2024</td>
                <td><span class="status-pill status-pending">Pending</span></td>
                <td><button class="action-btn"><i class="fas fa-eye"></i> View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Generate Change Password
  function generateChangePassword() {
    return `
      <div class="content-section">
        <div class="info-box">
          <i class="fas fa-info-circle"></i>
          <div>
            <p>Update your account password below. For security purposes, you'll need to enter your current password.</p>
          </div>
        </div>

        <div class="password-form" style="margin-top: 30px;">
          <h3 class="form-title">Change Password</h3>

          <div class="form-section">
            <div class="form-row">
              <div class="form-group full-width">
                <label for="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" placeholder="Enter your current password">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword" placeholder="Enter your new password">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <label for="confirmPassword">Confirm New Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm your new password">
              </div>
            </div>
          </div>

          <div class="password-strength" style="margin: 20px 0;">
            <div class="strength-label">Password Strength:</div>
            <div class="strength-meter">
              <div class="strength-bar" style="width: 0%; background-color: #e0e0e0;"></div>
            </div>
            <div class="strength-text">Weak</div>
          </div>

          <div class="info-box">
            <i class="fas fa-shield-alt"></i>
            <div>
              <p><strong>Password Requirements:</strong></p>
              <ul style="margin-top: 5px; padding-left: 20px;">
                <li>At least 8 characters long</li>
                <li>Include at least one uppercase letter</li>
                <li>Include at least one number</li>
                <li>Include at least one special character</li>
                <li>Cannot be the same as your previous 3 passwords</li>
              </ul>
            </div>
          </div>

          <div class="buttons-container" style="margin-top: 20px;">
            <button class="widget-config-btn">
              <i class="fas fa-key"></i> Update Password
            </button>
          </div>
        </div>

        <div class="password-history" style="margin-top: 40px;">
          <h3 class="content-subtitle">Password Change History</h3>

          <table class="modal-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>IP Address</th>
                <th>Device</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>January 15, 2025</td>
                <td>10:30 AM</td>
                <td>192.168.1.105</td>
                <td>Windows PC (Chrome)</td>
              </tr>
              <tr>
                <td>November 5, 2024</td>
                <td>3:45 PM</td>
                <td>192.168.1.232</td>
                <td>iPhone (Safari)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Generate Profile Settings
  function generateProfileSettings() {
    return `
      <div class="content-section">
        <div class="info-box">
          <i class="fas fa-info-circle"></i>
          <div>
            <p>Manage your profile settings and preferences below.</p>
          </div>
        </div>

        <div class="profile-settings-container">
          <div class="profile-sidebar">
            <div class="profile-avatar-large">
              <img src="data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='50' height='50'%3e%3ccircle cx='25' cy='25' r='25' fill='%234285F4'/%3e%3ccircle cx='25' cy='18' r='7' fill='white'/%3e%3cpath d='M40,42c0-8.3-6.7-15-15-15s-15,6.7-15,15' fill='white'/%3e%3c/svg%3e" alt="Profile">
              <button class="change-avatar-btn">
                <i class="fas fa-camera"></i>
              </button>
            </div>

            <div class="profile-nav">
              <button class="profile-nav-item active">
                <i class="fas fa-user"></i> Personal Information
              </button>
              <button class="profile-nav-item">
                <i class="fas fa-mobile-alt"></i> Connected Devices
              </button>
            </div>
          </div>

          <div class="profile-content">
            <h3 class="section-title">Personal Information</h3>

            <div class="form-section">
              <div class="form-row">
                <div class="form-group">
                  <label for="profileFirstName">First Name</label>
                  <input type="text" id="profileFirstName" value="John">
                </div>
                <div class="form-group">
                  <label for="profileMiddleName">Middle Name</label>
                  <input type="text" id="profileMiddleName" value="Michael">
                </div>
                <div class="form-group">
                  <label for="profileLastName">Last Name</label>
                  <input type="text" id="profileLastName" value="Smith">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="profileBirthdate">Birthdate</label>
                  <input type="date" id="profileBirthdate" value="2000-05-15">
                </div>
                <div class="form-group">
                  <label for="profileGender">Gender</label>
                  <select id="profileGender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="profileNationality">Nationality</label>
                  <input type="text" id="profileNationality" value="American">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group full-width">
                  <label for="profileAddress">Complete Address</label>
                  <input type="text" id="profileAddress" value="123 Main Street, Anytown, CA 12345">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="profileEmail">Email Address</label>
                  <input type="email" id="profileEmail" value="john.smith@example.com">
                </div>
                <div class="form-group">
                  <label for="profilePhone">Phone Number</label>
                  <input type="tel" id="profilePhone" value="(555) 123-4567">
                </div>
                <div class="form-group">
                  <label for="profileEmergencyContact">Emergency Contact</label>
                  <input type="tel" id="profileEmergencyContact" value="(555) 987-6543">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="profileProgram">Program/Course</label>
                  <input type="text" id="profileProgram" value="Bachelor of Science in Computer Science" disabled>
                </div>
                <div class="form-group">
                  <label for="profileYearLevel">Year Level</label>
                  <input type="text" id="profileYearLevel" value="2nd Year" disabled>
                </div>
                <div class="form-group">
                  <label for="profileStudentId">Student ID</label>
                  <input type="text" id="profileStudentId" value="2023-12345" disabled>
                </div>
              </div>
            </div>

            <div class="buttons-container">
              <button class="widget-config-btn" style="background-color: #e0e0e0; color: #546e7a;">
                <i class="fas fa-times"></i> Cancel
              </button>
              <button class="widget-config-btn">
                <i class="fas fa-save"></i> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Generate Modal Content
  function generateModalContent(contentId) {
    if (contentId === 'payment-center') {
      return `
        <p>Please select a payment method and enter the amount to pay:</p>
        <div style="margin: 20px 0;">
          <label for="paymentAmount">Payment Amount (PHP):</label>
          <input type="number" id="paymentAmount" min="100" value="5000" style="padding: 8px; width: 150px; margin-left: 10px;">
        </div>

        <div style="margin: 20px 0;">
          <div style="margin-bottom: 10px;"><strong>Payment Method:</strong></div>
          <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <div style="padding: 15px; border: 1px solid #e0e0e0; border-radius: 5px; width: 120px; text-align: center; cursor: pointer;">
              <i class="fas fa-credit-card" style="font-size: 24px; color: #1a73e8; margin-bottom: 10px;"></i>
              <div>Credit Card</div>
            </div>
            <div style="padding: 15px; border: 1px solid #e0e0e0; border-radius: 5px; width: 120px; text-align: center; cursor: pointer;">
              <i class="fas fa-university" style="font-size: 24px; color: #1a73e8; margin-bottom: 10px;"></i>
              <div>Bank Transfer</div>
            </div>
            <div style="padding: 15px; border: 1px solid #e0e0e0; border-radius: 5px; width: 120px; text-align: center; cursor: pointer;">
              <i class="fas fa-building" style="font-size: 24px; color: #1a73e8; margin-bottom: 10px;"></i>
              <div>Over the Counter</div>
            </div>
            <div style="padding: 15px; border: 1px solid #e0e0e0; border-radius: 5px; width: 120px; text-align: center; cursor: pointer;">
              <i class="fas fa-mobile-alt" style="font-size: 24px; color: #1a73e8; margin-bottom: 10px;"></i>
              <div>Mobile Payment</div>
            </div>
          </div>
        </div>

        <table class="modal-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tuition Fee</td>
              <td>₱20,000.00</td>
            </tr>
            <tr>
              <td>Miscellaneous Fee</td>
              <td>₱5,000.00</td>
            </tr>
            <tr>
              <td>Laboratory Fee</td>
              <td>₱3,500.00</td>
            </tr>
            <tr>
              <td>Development Fee</td>
              <td>₱2,500.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>₱31,000.00</td>
            </tr>
            <tr>
              <td>Amount Paid</td>
              <td>₱15,000.00</td>
            </tr>
            <tr>
              <td>Balance</td>
              <td>₱16,000.00</td>
            </tr>
          </tfoot>
        </table>
      `;
    } else if (contentId === 'grade-completion') {
      return `
        <p>Fill out this form to request grade completion for a subject:</p>

        <div style="margin: 20px 0;">
          <label for="subjectSelect">Select Subject:</label>
          <select id="subjectSelect" style="padding: 8px; width: 100%; margin-top: 5px;">
            <option value="math">Mathematics 101</option>
            <option value="physics">Physics 201</option>
            <option value="english">English Literature</option>
            <option value="cs">Computer Science</option>
          </select>
        </div>

        <div style="margin: 20px 0;">
          <label for="instructorName">Instructor Name:</label>
          <input type="text" id="instructorName" style="padding: 8px; width: 100%; margin-top: 5px;">
        </div>

        <div style="margin: 20px 0;">
          <label for="reasonSelect">Reason for Request:</label>
          <select id="reasonSelect" style="padding: 8px; width: 100%; margin-top: 5px;">
            <option value="incomplete">Incomplete Requirements</option>
            <option value="missed">Missed Final Examination</option>
            <option value="error">Error in Grade Entry</option>
            <option value="other">Other (Specify Below)</option>
          </select>
        </div>

        <div style="margin: 20px 0;">
          <label for="requestDetails">Additional Details:</label>
          <textarea id="requestDetails" rows="4" style="padding: 8px; width: 100%; margin-top: 5px; resize: vertical;"></textarea>
        </div>

        <div class="alert-box">
          <i class="fas fa-exclamation-circle"></i>
          <div>
            <p><strong>Important Notice:</strong></p>
            <p>Grade completion requests must be submitted within 30 days of grade posting. Processing may take up to 5 working days.</p>
          </div>
        </div>
      `;
    } else if (contentId === 'change-password') {
      return `
        <p>Update your account password below:</p>

        <div style="margin: 20px 0;">
          <label for="currentPassword">Current Password:</label>
          <input type="password" id="currentPassword" style="padding: 8px; width: 100%; margin-top: 5px;">
        </div>

        <div style="margin: 20px 0;">
          <label for="newPassword">New Password:</label>
          <input type="password" id="newPassword" style="padding: 8px; width: 100%; margin-top: 5px;">
        </div>

        <div style="margin: 20px 0;">
          <label for="confirmPassword">Confirm New Password:</label>
          <input type="password" id="confirmPassword" style="padding: 8px; width: 100%; margin-top: 5px;">
        </div>

        <div class="info-box">
          <i class="fas fa-shield-alt"></i>
          <div>
            <p><strong>Password Requirements:</strong></p>
            <ul style="margin-top: 5px; padding-left: 20px;">
              <li>At least 8 characters long</li>
              <li>Include at least one uppercase letter</li>
              <li>Include at least one number</li>
              <li>Include at least one special character</li>
            </ul>
          </div>
        </div>
      `;
    } else {
      // Default modal content
      return `
        <p>This is a demonstration of the modal for <strong>${contentId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong>.</p>
        <p>In a complete implementation, this would contain actual functionality related to ${contentId.replace(/-/g, ' ')}.</p>
      `;
    }
  }

  // Function to get icon class for a content ID
  function getIconForContentId(contentId) {
    const iconMap = {
      'dashboard': 'fas fa-tachometer-alt',
      'account-statement': 'fas fa-file-invoice-dollar',
      'payment-report': 'fas fa-receipt',
      'payment-center': 'fas fa-credit-card',
      'student-maintenance': 'fas fa-user-edit',
      'grade-display': 'fas fa-chart-bar',
      'online-enrollment': 'fas fa-user-plus',
      'registration-cert': 'fas fa-certificate',
      'schedule-inquiry': 'fas fa-calendar-alt',
      'current-enrollment': 'fas fa-clipboard-list',
      'school-map': 'fas fa-map-marked-alt',
      'evaluation-report': 'fas fa-chart-line',
      'teacher-evaluation': 'fas fa-chalkboard-teacher',
      'grades-display': 'fas fa-graduation-cap',
      'grade-completion': 'fas fa-tasks',
      'medical-record': 'fas fa-notes-medical',
      'change-password': 'fas fa-key',
      'profile-settings': 'fas fa-user-cog',
      'default': 'fas fa-file-alt'
    };

    return iconMap[contentId] || iconMap['default'];
  }

  // Generate Dashboard Content
  function generateDashboardContent() {
    return `
      <div class="dashboard-grid">
        <div class="widget upcoming-widget">
          <div class="widget-header">
            <h3 class="widget-title"><i class="fas fa-clock"></i> Upcoming Deadlines</h3>
            <div class="widget-controls">
              <button class="widget-btn"><i class="fas fa-sync-alt"></i></button>
            </div>
          </div>
          <div class="widget-content">
            <div class="list-item">
              <div class="list-item-primary">Mathematics Assignment</div>
              <div class="list-item-secondary">Due: Apr 10, 2025</div>
            </div>
            <div class="list-item">
              <div class="list-item-primary">Physics Lab Report</div>
              <div class="list-item-secondary">Due: Apr 15, 2025</div>
            </div>
            <div class="list-item">
              <div class="list-item-primary">English Essay</div>
              <div class="list-item-secondary">Due: Apr 20, 2025</div>
            </div>
            <div class="list-item">
              <div class="list-item-primary">Computer Science Project</div>
              <div class="list-item-secondary">Due: Apr 30, 2025</div>
            </div>
            <div class="list-item">
              <div class="list-item-primary">Tuition Payment</div>
              <div class="list-item-secondary">Due: May 15, 2025</div>
            </div>
            <div class="update-msg">Last updated: Just now</div>
          </div>
        </div>

        <div class="widget grades-widget">
          <div class="widget-header">
            <h3 class="widget-title"><i class="fas fa-chart-bar"></i> Recent Grades</h3>
            <div class="widget-controls">
              <button class="widget-btn"><i class="fas fa-sync-alt"></i></button>
            </div>
          </div>
          <div class="widget-content">
            <div class="grade-item">
              <div class="grade-subject">Mathematics 101</div>
              <div class="grade-value">92</div>
            </div>
            <div class="grade-item">
              <div class="grade-subject">Physics 201</div>
              <div class="grade-value">88</div>
            </div>
            <div class="grade-item">
              <div class="grade-subject">English Literature</div>
              <div class="grade-value">95</div>
            </div>
            <div class="grade-item">
              <div class="grade-subject">Computer Science</div>
              <div class="grade-value">90</div>
            </div>
            <div class="grade-item">
              <div class="grade-subject">Physical Education</div>
              <div class="grade-value">98</div>
            </div>
            <div class="update-msg">Last updated: Just now</div>
          </div>
        </div>

        <div class="widget announcements-widget">
          <div class="widget-header">
            <h3 class="widget-title"><i class="fas fa-bullhorn"></i> Announcements</h3>
            <div class="widget-controls">
              <button class="widget-btn"><i class="fas fa-sync-alt"></i></button>
            </div>
          </div>
          <div class="widget-content">
            <div class="announcement">
              <div class="announcement-title">Final Exam Schedule Posted</div>
              <div class="announcement-date">Apr 01, 2025</div>
              <p>The final examination schedule for the current semester has been posted. Please check your email for details.</p>
            </div>
            <div class="announcement">
              <div class="announcement-title">Library Extended Hours</div>
              <div class="announcement-date">Mar 28, 2025</div>
              <p>The library will be open extended hours during finals week. New hours: 7 AM - 11 PM</p>
            </div>
            <div class="announcement">
              <div class="announcement-title">Enrollment for Next Semester</div>
              <div class="announcement-date">Mar 25, 2025</div>
              <p>Enrollment for the next semester begins on May 1. Make sure to clear any outstanding balances.</p>

              </div>
             <div class="announcement">
<div class="announcement-title">Campus Announcements</div>
<div class="announcement-date">Mar 25, 2025</div>
<img src="Mabuhay.png" alt="Labor Day Tribute" />
<p class="announcement-text short-text">
  𝐓𝐡𝐞 𝐔𝐧𝐫𝐢𝐯𝐚𝐥𝐞𝐝 𝐖𝐨𝐫𝐤 𝐄𝐭𝐡𝐢𝐜 𝐨𝐟 𝐭𝐡𝐞 𝐅𝐢𝐥𝐢𝐩𝐢𝐧𝐨 𝐖𝐨𝐫𝐤𝐞𝐫 🔧🇵🇭 ...
</p>
<p class="announcement-text full-text">
  𝐓𝐡𝐞 𝐔𝐧𝐫𝐢𝐯𝐚𝐥𝐞𝐝 𝐖𝐨𝐫𝐤 𝐄𝐭𝐡𝐢𝐜 𝐨𝐟 𝐭𝐡𝐞 𝐅𝐢𝐥𝐢𝐩𝐢𝐧𝐨 𝐖𝐨𝐫𝐤𝐞𝐫 🔧🇵🇭  
  This Labor Day, we honor the invaluable role of work in shaping our nation and celebrate the steadfast dedication, resilience, and integrity of the Filipino worker, whose contributions are the pillars of our nation's growth. 🌱  
  To the early risers, the tireless night workers, the frontliners 👩‍⚕️, the defenders of rights 🧑‍⚖️, and the educators who nurture the next generation 👩‍🏫 — your service powers the heartbeat of our communities.  
  You are the silent force behind every milestone, the builders of hope, and the bearers of dreams. Heroes may not always wear capes, but they certainly wear uniforms, aprons, and ID lanyards. 🦸‍♀️🏷️  
  "𝘠𝘰𝘶𝘳 𝘩𝘢𝘳𝘥 𝘸𝘰𝘳𝘬 𝘵𝘰𝘥𝘢𝘺 𝘭𝘢𝘺𝘴 𝘵𝘩𝘦 𝘨𝘳𝘰𝘶𝘯𝘥𝘸𝘰𝘳𝘬 𝘧𝘰𝘳 𝘵𝘩𝘦 𝘭𝘦𝘨𝘢𝘤𝘺 𝘰𝘧 𝘵𝘰𝘮𝘰𝘳𝘳𝘰𝘸."
</p>
<button class="toggle-btn" onclick="toggleText(this)">See More</button>
<div class="update-msg">Last updated: Just now</div>
</div>
          </div>
        </div>

        <div class="widget balance-widget">
          <div class="widget-header">
            <h3 class="widget-title"><i class="fas fa-money-bill-wave"></i> Account Balance</h3>
            <div class="widget-controls">
              <button class="widget-btn"><i class="fas fa-sync-alt"></i></button>
            </div>
          </div>
          <div class="widget-content">
            <div class="balance-display">
              <div class="balance-value">₱16,000.00</div>
              <div class="balance-label">Remaining Balance</div>
            </div>
            <div class="balance-info">
              <div class="balance-item">
                <div class="balance-item-value">₱31,000.00</div>
                <div class="balance-item-label">Total Fees</div>
              </div>
              <div class="balance-item">
                <div class="balance-item-value">₱15,000.00</div>
                <div class="balance-item-label">Amount Paid</div>
              </div>
            </div>
            <div style="margin-top: 15px; text-align: center;">
              <button class="widget-config-btn" style="margin: 0; display: inline-flex;">
                <i class="fas fa-credit-card"></i> Pay Now
              </button>
            </div>
            <div class="update-msg">Last updated: Just now</div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <i class="fas fa-info-circle"></i>
        <div>
          <p><strong>Welcome to your Student Dashboard!</strong></p>
          <p>Here you can access all your important academic information, track deadlines, view grades, and manage your student account. Use the menu on the left to navigate to different sections. Today is <span class="current-date">April 2, 2025</span>.</p>
        </div>
      </div>
    `;
  }

  // See more or see less in Announcement
  
  function toggleText(button) {
    const announcement = button.closest('.announcement');
    if (!announcement) return;
  
    announcement.classList.toggle('expanded');
    button.textContent = announcement.classList.contains('expanded') ? 'See Less' : 'See More';
  }
  


  

  // Initialize Dashboard
  function initDashboard() {
    // Toggle nested items
    carets.forEach(caret => {
      caret.addEventListener('click', function() {
        this.classList.toggle('caret-down')
        const nested = this.nextElementSibling;
        if (nested && nested.classList.contains('nested')) {
          nested.classList.toggle('active');
        }
      });

      // Also check if this caret has a content-id for direct navigation
      const contentId = caret.getAttribute('data-content-id');
      if (contentId) {
        caret.addEventListener('click', function() {
          updateContent(this.textContent.trim(), contentId);
        });
      }
    });

    // Handle menu item clicks
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        const contentId = this.getAttribute('data-content-id');
        const title = this.textContent.trim();
        updateContent(title, contentId);
      });
    });

    // Handle avatar modal
    if (profileAvatar) {
      profileAvatar.addEventListener('click', function() {
        avatarModal.classList.remove('hidden');
      });
    }

    if (closeAvatarModal) {
      closeAvatarModal.addEventListener('click', function() {
        avatarModal.classList.add('hidden');
      });
    }

    if (cancelAvatarModal) {
      cancelAvatarModal.addEventListener('click', function() {
        avatarModal.classList.add('hidden');
      });
    }

    // Avatar selection
    avatarOptions.forEach(option => {
      option.addEventListener('click', function() {
        avatarOptions.forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
      });
    });

    if (saveAvatar) {
      saveAvatar.addEventListener('click', function() {
        const selectedAvatar = document.querySelector('.avatar-option.selected');
        if (selectedAvatar) {
          const avatarColor = selectedAvatar.getAttribute('data-color');
          const avatarSrc = selectedAvatar.querySelector('img').src;

          // Update the profile avatar
          document.querySelector('#profileAvatar img').src = avatarSrc;

          // Save preference
          localStorage.setItem('userAvatar', avatarSrc);

          // Close modal
          avatarModal.classList.add('hidden');
        }
      });
    }

    // Theme Switch
    if (themeSwitch) {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
      }

      themeSwitch.addEventListener('change', function() {
        if (this.checked) {
          document.body.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
        }
      });
    }

    // Load saved avatar if exists
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar && document.querySelector('#profileAvatar img')) {
      document.querySelector('#profileAvatar img').src = savedAvatar;
    }

    // Add global function to open modal
    window.openModal = openModal;
  }

  // Initialize dashboard
  initDashboard();
});

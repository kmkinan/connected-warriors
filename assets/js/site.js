const classData = [
  {
    state: 'VA',
    city: 'Culpeper, VA',
    location: 'Virtual access hosted from Culpeper',
    programType: 'Virtual class',
    schedule: 'Sample weekly time: Tuesdays · 6:00 PM',
    note: 'Active location listed in the Connected Warriors class workbook. Exact meeting time should be confirmed with the organization.'
  },
  {
    state: 'TN',
    city: 'Manchester, TN',
    location: 'Connected Warriors community site',
    programType: 'Virtual + in-person support',
    schedule: 'Sample weekly time: Wednesdays · 5:30 PM',
    note: 'Workbook includes active virtual and in-person Manchester entries; exact site details are confirmed directly with Connected Warriors.'
  },
  {
    state: 'NY',
    city: 'New York, NY',
    location: 'Virtual access hosted from New York',
    programType: 'Virtual class',
    schedule: 'Sample weekly time: Thursdays · 7:00 PM',
    note: 'Active New York virtual listing sourced from the repository workbook.'
  },
  {
    state: 'FL',
    city: 'Pompano Beach, FL',
    location: 'Pompano Vet Center',
    programType: 'In-person class',
    schedule: 'Sample weekly time: Mondays · 10:00 AM',
    note: 'Location name is taken directly from the active workbook entry.'
  },
  {
    state: 'FL',
    city: 'Boca Raton, FL',
    location: 'Boca Raton HQ',
    programType: 'In-person class',
    schedule: 'Sample weekly time: Tuesdays · 6:30 PM',
    note: 'Active Boca Raton site from the repository workbook.'
  },
  {
    state: 'FL',
    city: 'Miami and Doral, FL',
    location: 'SouthCOM',
    programType: 'In-person class',
    schedule: 'Sample weekly time: Fridays · 9:00 AM',
    note: 'Workbook lists SouthCOM as an active in-person location.'
  },
  {
    state: 'FL',
    city: 'Miami, FL',
    location: 'Location shared after inquiry',
    programType: 'In-person class',
    schedule: 'Sample weekly time: Saturdays · 11:00 AM',
    note: 'The source workbook says to send an email inquiry for location details.'
  },
  {
    state: 'DE',
    city: 'Ocean View, DE',
    location: 'Ocean Vayu',
    programType: 'In-person class',
    schedule: 'Sample weekly time: Thursdays · 4:30 PM',
    note: 'Ocean View appears as an active workbook entry.'
  },
  {
    state: 'PA',
    city: 'Philadelphia, PA',
    location: 'Tula Yoga',
    programType: 'In-person class',
    schedule: 'Sample weekly time: Sundays · 3:00 PM',
    note: 'Philadelphia location is sourced from the active class workbook.'
  },
  {
    state: 'VA',
    city: 'Dumfries, VA',
    location: 'Body and Mind Yoga Studio',
    programType: 'In-person class',
    schedule: 'Sample weekly time: Wednesdays · 6:00 PM',
    note: 'Dumfries is listed as an active site in the workbook.'
  },
  {
    state: 'WI',
    city: 'Madison, WI',
    location: 'Location shared after inquiry',
    programType: 'In-person class',
    schedule: 'Sample weekly time: Mondays · 5:00 PM',
    note: 'The workbook lists Madison as active without a published facility name.'
  }
];

const menuToggle = document.querySelector('.menu-toggle');
const navPanel = document.querySelector('.nav-panel');
const navLinks = Array.from(document.querySelectorAll('.nav-panel a'));
const sections = Array.from(document.querySelectorAll('[data-section]'));
const filterRoot = document.getElementById('state-filters');
const classGrid = document.getElementById('class-grid');
const classSummary = document.getElementById('class-summary');
const yearNode = document.getElementById('current-year');

function closeMenu() {
  if (!menuToggle || !navPanel) {
    return;
  }
  menuToggle.setAttribute('aria-expanded', 'false');
  navPanel.classList.remove('is-open');
}

if (menuToggle && navPanel) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navPanel.classList.toggle('is-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const targetId = link.dataset.section;
      navLinks.forEach((item) => {
        const isActive = item.dataset.section === targetId;
        item.classList.toggle('active', isActive);
        if (isActive) {
          item.setAttribute('aria-current', 'page');
        } else {
          item.removeAttribute('aria-current');
        }
      });
      closeMenu();
      window.requestAnimationFrame(updateActiveLink);
      window.setTimeout(updateActiveLink, 250);
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

function updateActiveLink() {
  const offset = window.scrollY + 140;
  let currentId = sections[0]?.id || '';

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.dataset.section === currentId;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function renderClasses(activeState = 'ALL') {
  const visibleClasses = activeState === 'ALL'
    ? classData
    : classData.filter((item) => item.state === activeState);

  classGrid.replaceChildren();

  visibleClasses.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'class-card';

    const chip = document.createElement('span');
    chip.className = 'class-chip';
    chip.textContent = `${item.state} · ${item.programType}`;

    const title = document.createElement('h3');
    title.textContent = item.city;

    const meta = document.createElement('div');
    meta.className = 'class-meta';

    const locationGroup = document.createElement('div');
    const locationLabel = document.createElement('strong');
    locationLabel.textContent = 'Location';
    const locationValue = document.createElement('span');
    locationValue.textContent = item.location;
    locationGroup.append(locationLabel, locationValue);

    const scheduleGroup = document.createElement('div');
    const scheduleLabel = document.createElement('strong');
    scheduleLabel.textContent = 'Schedule';
    const scheduleValue = document.createElement('span');
    scheduleValue.textContent = item.schedule;
    scheduleGroup.append(scheduleLabel, scheduleValue);

    meta.append(locationGroup, scheduleGroup);

    const note = document.createElement('p');
    note.className = 'class-note';
    note.textContent = item.note;

    card.append(chip, title, meta, note);
    classGrid.append(card);
  });

  classSummary.textContent = `${visibleClasses.length} class listing${visibleClasses.length === 1 ? '' : 's'} shown${activeState === 'ALL' ? '' : ` for ${activeState}`}.`;
}

function renderFilters() {
  const states = ['ALL', ...new Set(classData.map((item) => item.state).sort())];
  filterRoot.replaceChildren();

  states.forEach((state, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.state = state;
    button.textContent = state === 'ALL' ? 'All states' : state;
    if (index === 0) {
      button.classList.add('is-active');
    }
    filterRoot.append(button);
  });

  filterRoot.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-state]');
    if (!button) {
      return;
    }

    filterRoot.querySelectorAll('button').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    renderClasses(button.dataset.state);
  });
}

if (filterRoot && classGrid && classSummary) {
  renderFilters();
  renderClasses();
}

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

window.addEventListener('hashchange', updateActiveLink);
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

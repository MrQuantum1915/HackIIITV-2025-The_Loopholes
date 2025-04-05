document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');

  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  
  const skillInput = document.getElementById('skillInput');
  const addSkillButton = document.getElementById('addSkill');
  const skillsList = document.getElementById('skillsList');
  const skillsHidden = document.getElementById('skillsHidden');
  let skills = [];

  addSkillButton.addEventListener('click', () => {
    const skill = skillInput.value.trim();
    if (skill !== '') {
      skills.push(skill);
      updateSkillsList(skills);
      skillInput.value = '';
    }
  });

  function updateSkillsList(skillsArray) {
    skillsList.innerHTML = '';
    skillsArray.forEach((skill, index) => {
      const skillTag = document.createElement('div');
      skillTag.classList.add('skill-tag');
      skillTag.innerHTML = `
        ${skill}
        <button onclick="removeSkill(${index})">x</button>
      `;
      skillsList.appendChild(skillTag);
    });
    skillsHidden.value = skillsArray.join(',');
  }

  window.removeSkill = (index) => {
    skills.splice(index, 1);
    updateSkillsList(skills);
  };


  const domainInput = document.getElementById('domainInput');
  const addDomainButton = document.getElementById('addDomain');
  const domainsList = document.getElementById('domainsList');
  const domainsHidden = document.getElementById('domainsHidden');
  let domains = [];

  addDomainButton.addEventListener('click', () => {
    const domain = domainInput.value.trim();
    if (domain !== '') {
      domains.push(domain);
      updateDomainsList(domains);
      domainInput.value = '';
    }
  });

  function updateDomainsList(domainsArray) {
    domainsList.innerHTML = '';
    domainsArray.forEach((domain, index) => {
      const domainTag = document.createElement('div');
      domainTag.classList.add('skill-tag');
      domainTag.innerHTML = `
        ${domain}
        <button onclick="removeDomain(${index})">x</button>
      `;
      domainsList.appendChild(domainTag);
    });
    domainsHidden.value = domainsArray.join(',');
  }

  window.removeDomain = (index) => {
    domains.splice(index, 1);
    updateDomainsList(domains);
  };

  
  const frameworkInput = document.getElementById('frameworkInput');
  const addFrameworkButton = document.getElementById('addFramework');
  const frameworksList = document.getElementById('frameworksList');
  const frameworksHidden = document.getElementById('frameworksHidden');
  let frameworks = [];

  addFrameworkButton.addEventListener('click', () => {
    const framework = frameworkInput.value.trim();
    if (framework !== '') {
      frameworks.push(framework);
      updateFrameworksList(frameworks);
      frameworkInput.value = '';
    }
  });

  function updateFrameworksList(frameworksArray) {
    frameworksList.innerHTML = '';
    frameworksArray.forEach((framework, index) => {
      const frameworkTag = document.createElement('div');
      frameworkTag.classList.add('skill-tag');
      frameworkTag.innerHTML = `
        ${framework}
        <button onclick="removeFramework(${index})">x</button>
      `;
      frameworksList.appendChild(frameworkTag);
    });
    frameworksHidden.value = frameworksArray.join(',');
  }

  window.removeFramework = (index) => {
    frameworks.splice(index, 1);
    updateFrameworksList(frameworks);
  };

  
  const sectionButtons = document.querySelectorAll('.section-btn');

  sectionButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('open');
      const sectionContent = button.nextElementSibling;
      sectionContent.classList.toggle('open');
    });
  });

});




document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('roadmapForm');
  const mainContent = document.querySelector('.main-content');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate roadmap');
      }

      const result = await response.json();

      
      mainContent.innerHTML = `
        <div class="fade-in">
          <div class="header">
            <h1 class="text-xl font-bold">Your Personalized Roadmap</h1>
          </div>
          <div class="roadmap-result">
            <p>${result.message}</p>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while generating the roadmap.');
    }
  });
});
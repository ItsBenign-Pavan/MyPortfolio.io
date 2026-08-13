/* ==========================================================
   INTERACTIVE SKILLS — scoped to #skills
   ========================================================== */
(function () {
    'use strict';

    const data = {
        operations: {
            index: '01',
            label: 'SECURITY OPERATIONS',
            title: 'Security Operations',
            icon: 'ti-shield',
            description: 'Security monitoring and incident handling across Microsoft security platforms, from alert triage through investigation and response.',
            skills: ['Microsoft Sentinel', 'Microsoft Defender XDR', 'Incident Response', 'Alert Triage', 'Security Monitoring', 'Incident Investigation']
        },
        detection: {
            index: '02',
            label: 'DETECTION ENGINEERING',
            title: 'Detection Engineering',
            icon: 'ti-search',
            description: 'Building practical detections and hunting workflows that turn telemetry into actionable security signals.',
            skills: ['KQL', 'Sigma Rules', 'Detection Engineering', 'Threat Hunting', 'MITRE ATT&CK', 'Analytics Rules']
        },
        endpoint: {
            index: '03',
            label: 'ENDPOINT SECURITY',
            title: 'Endpoint Security',
            icon: 'ti-lock',
            description: 'Endpoint-focused defense covering EDR/XDR investigation, Windows telemetry, process activity and containment workflows.',
            skills: ['Microsoft Defender for Endpoint', 'EDR / XDR', 'Windows Security', 'Sysmon', 'Endpoint Investigation', 'Process Analysis']
        },
        cloud: {
            index: '04',
            label: 'CLOUD & IDENTITY',
            title: 'Cloud & Identity',
            icon: 'ti-cloud',
            description: 'Microsoft cloud security foundations spanning Azure, identity, access control and security telemetry.',
            skills: ['Microsoft Azure', 'Microsoft Entra ID', 'RBAC', 'Conditional Access', 'MFA', 'Log Analytics']
        },
        tools: {
            index: '05',
            label: 'SECURITY TOOLKIT',
            title: 'Security Toolkit',
            icon: 'ti-settings',
            description: 'Hands-on tools and platforms used for network analysis, Linux telemetry, security validation and automation.',
            skills: ['Wireshark', 'Linux', 'Suricata', 'PowerShell', 'Sysinternals', 'Network Analysis']
        }
    };

    const section = document.getElementById('skills');
    if (!section) return;

    const buttons = section.querySelectorAll('.skill-category');
    const title = section.querySelector('#skillPanelTitle');
    const description = section.querySelector('#skillPanelDescription');
    const kicker = section.querySelector('.skills-panel-kicker');
    const mark = section.querySelector('.skills-panel-mark i');
    const grid = section.querySelector('#skillChipGrid');

    function render(key) {
        const item = data[key];
        if (!item) return;

        buttons.forEach(button => {
            const active = button.dataset.skill === key;
            button.classList.toggle('active', active);
            button.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        kicker.textContent = `${item.index} / ${item.label}`;
        title.textContent = item.title;
        description.textContent = item.description;
        mark.className = item.icon;

        grid.innerHTML = item.skills.map((skill, index) => `
            <div class="skill-chip" style="animation-delay:${index * 45}ms">
                <span>${skill}</span>
            </div>
        `).join('');
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            render(this.dataset.skill);
        });
    });

    render('operations');
})();

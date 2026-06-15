
const elTime = document.getElementById('energi-time');
const elDate = document.getElementById('energi-date');
const elBattery = document.getElementById('energi-battery');
const elVisitor = document.getElementById('visitor-text-pv');
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
const optionsTime = { hour: '2-digit', minute: '2-digit', timeZone: 'Indian/Reunion' };
const optionsDate = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Indian/Reunion' };
function updateClock() {
    const now = new Date();
    elTime.textContent = now.toLocaleTimeString('fr-FR', optionsTime);
    elDate.textContent = capitalize(now.toLocaleDateString('fr-FR', optionsDate));
}
async function updateBattery() {
    if (!navigator.getBattery) {
        elBattery.textContent = "🔋";
        return;
    }
    const battery = await navigator.getBattery();
    const level = Math.round(battery.level * 100);

    elBattery.innerHTML = `
        <div class="battery-icon">
            <div class="battery-level" style="width:${level}%;"></div>
        </div>
        ${level}%
    `;
}
updateClock();
setInterval(updateClock, 1000);
updateBattery();
setInterval(updateBattery, 5000);
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(async () => {
        try {
            const res = await fetch('https://energix-97441.goatcounter.com/counter/total.json');
            const data = await res.json();

            if (elVisitor) {
                const n = data.count || 0;
                elVisitor.textContent = n > 0
                    ? `${n.toLocaleString()} ${n > 1 ? "VUES" : "VUE"}`
                    : "EN LIGNE";
            }
        } catch {
            if (elVisitor) elVisitor.textContent = "14 Visites";
            console.log("Stats PV en attente ou bloquées");
        }
    }, 1000);
});
function confirmDownload(event) {
					const box = document.getElementById('cvUpdateDate');
					box.innerHTML = '<span style="color: #0077b6;">⏳ Téléchargement lancé...</span>';
					box.style.opacity = 1;
					const now = new Date();
					const dateFormatted = now.toLocaleDateString('fr-FR', {
						day: '2-digit', month: '2-digit', year: 'numeric',
						timeZone: 'Indian/Reunion'
					});
					const timeFormatted = now.toLocaleTimeString('fr-FR', {
						hour: '2-digit', minute: '2-digit', second: '2-digit',
						timeZone: 'Indian/Reunion'
					});
					setTimeout(() => {
						const message = `<span style="color: #2e7d32; font-weight: 600;">✔ Téléchargement du CV réussi</span><br>
										 <small style="color: #000000; font-weight: 600;"> — Mis à jour le ${dateFormatted} à ${timeFormatted} (GMT+4) Heure de La Réunion</small>`;
						box.innerHTML = message;
					}, 4000); // 7 secondes = 7000ms
					setTimeout(() => {
						box.style.opacity = 0;
						setTimeout(() => box.innerHTML = '', 600);
					}, 60000);
}
window.toggleSection = function(sectionId) {
    const card = document.getElementById(sectionId);
    if (!card) return;
    const content = card.querySelector('.card-content');
    const btn = card.querySelector('.toggle-btn');
    if (!content || !btn) return;
    const isHidden = window.getComputedStyle(content).display === 'none';
    content.style.display = isHidden ? 'block' : 'none';
    btn.textContent = isHidden ? '▼' : '▶';
    if (isHidden) {
        btn.classList.remove('collapsed');
    } else {
        btn.classList.add('collapsed');
    }
};
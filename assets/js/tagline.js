const data = [

{
command:">> portfolio-scan",

output:"No threats detected. Proceed with confidence."
},

{
command:">> reputation-check",

output:"Reputation: Trusted by coffee and curiosity."
},

{
command:">> vulnerability-scan",

output:"Only vulnerability found: Can't stop learning cybersecurity."
},

{
command:">> recruiter-mode",

output:"Scroll carefully... you might hire me."
},

{
command:">> threat-hunt",

output:"Hunting threats by profession, solving problems by passion."
},

{
command:">> coffee-status",

output:"Caffeine level sufficient for incident response."
},

{
command:">> whoami",

output:"Cyber Security Consultant | Microsoft Threat Expert"
}

];

let index=0;

const command=document.getElementById("socCommand");
const output=document.getElementById("socOutput");

function updateSOC(){

    command.style.opacity=0;
    output.style.opacity=0;

    setTimeout(()=>{

        command.textContent=data[index].command;
        output.textContent=data[index].output;

        command.style.opacity=1;
        output.style.opacity=1;

        index=(index+1)%data.length;

    },250);

}

updateSOC();

setInterval(updateSOC,3500);

function updateSOCTime() {

    const now = new Date();

    const time = now.toLocaleTimeString('en-GB', {
        hour12: false
    });

    document.getElementById("socTime").textContent = time;
}

updateSOCTime();

setInterval(updateSOCTime, 1000);
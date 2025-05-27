
function startForm() {
  document.getElementById('formSection').classList.remove('hidden');
  window.scrollTo({
    top: document.getElementById('formSection').offsetTop,
    behavior: 'smooth'
  });
}

let currentStep = 1;
function nextStep(step) {
  document.getElementById('step' + currentStep).classList.add('hidden');
  document.getElementById('step' + step).classList.remove('hidden');
  currentStep = step;
}

document.getElementById('proposalForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('proposalForm').classList.add('hidden');
  document.getElementById('confirmation').classList.remove('hidden');
});

'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристофор', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Мария', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var AMOUNT_WIZARDS = 4;
var wizardsList = [];
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var randomCount = function (max) {
  return Math.floor(Math.random() * max);
};

var generateWizard = function (wizardName, wizardSurname, coatColor, eyesColor) {
  var wizard = {
    name: wizardName[randomCount(wizardName.length)],
    surname: wizardSurname[randomCount(wizardSurname.length)],
    coat: coatColor[randomCount(coatColor.length)],
    eyes: eyesColor[randomCount(eyesColor.length)]
  };
  return wizard;
};

var createWizardElement = function (wizard, wizardElement) {
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;
};


var fragment = document.createDocumentFragment();
for (var i = 0; i < AMOUNT_WIZARDS; i++) {
  fragment.appendChild(renderWizard(i));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

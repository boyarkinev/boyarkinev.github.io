'use strict';
const root = document.querySelector('.root');
const placesList = root.querySelector('.places-list');
const popup = root.querySelector('.popup'); //Задаём переменную всплывающего окна
const popupContent = popup.querySelector('.popup__content');

const openPopupButton = document.querySelector('.button');
openPopupButton.addEventListener('click', function (event){
  popup.classList.toggle('popup_is-opened');
  addCardButton.disabled = true; //Деактивируем кнопку добавления карточки
}); //Открываем форму по клику на '+'

const popupForm = popupContent.querySelector('.popup__form'); //Задаём переменную формы
popupForm.addEventListener('submit', function (event){
  event.preventDefault();
  popupForm.reset();
});

const inputName = popupForm.elements.name;
const inputLink = popupForm.elements.link;

const closePopupButton = popupContent.querySelector('.popup__close');
closePopupButton.addEventListener('click', function (event) {
  popup.classList.remove('popup_is-opened');
}); //Закрываем форму по клику на крестике

const addCardButton = popupForm.querySelector('.popup__button');
addCardButton.addEventListener('click', function (event){
  createCard(inputName.value, inputLink.value);
  popup.classList.remove('popup_is-opened');
  addButtonDisabled();
}); //Создаем карточку, закрываем форму

function addButtonDisabled() {
  if (inputName.value !== '' && inputLink.value !== ''){
    addCardButton.disabled = false;
  } else {
    addCardButton.disabled = true;
  }
} 
popupForm.addEventListener('input', addButtonDisabled);
//Отключаем кнопку

const cardTemplate = document.querySelector('#card-template').content.querySelector('.place-card');

const createCard = function(name, link) { //Создаем динамическую карточку
  const placeCard = cardTemplate.cloneNode(true);
  placeCard.querySelector('.place-card__image').style.backgroundImage = `url(${link})`;
  placeCard.querySelector('.place-card__name').textContent = name;
  placesList.appendChild(placeCard);
}

for (let i = 0; i < initialCards.length; i++){
  createCard(initialCards[i].name, initialCards[i].link);
} //Выгружаем на страницу карточки с данными из массива initialCards

const cardButtons = function(e){
  if (e.target.classList.contains('place-card__like-icon')){
    e.target.classList.toggle('place-card__like-icon_liked');
  } else if (e.target.classList.contains('place-card__delete-icon')){
    const currentCard = e.target.closest('.place-card');
    currentCard.remove();
  }
}
//Создаем функцию для кнопки удаления и кнопки "like"

placesList.addEventListener('click', cardButtons);
//Создаем обработчик для удаления карточки отметки "like"

window.addEventListener('keydown', function (event){
  if (event.key === `Escape`){
    popup.classList.remove('popup_is-opened');
    popupForm.reset();
  }
}); //Закрываем popup при нажатии esc

window.addEventListener('mousedown', function (event){
  if (!popupContent.contains(event.target)){
    popup.classList.remove('popup_is-opened');
    popupForm.reset();
  }
}); //Закрываем popup при клике вне формы



/** REVIEW: В целом по работе:
 *  !!! Просьба не удалять комментарии проверяющего до принятия работы - это затрудняет проверку !!!
 *
 *  Хорошая работа, функциональность работает в полном обьеме и нет критических замечаний.
 *
 *  Большинство мест, которые отмечены "Можно лучше" было бы замечательно исправить в этом спринте
 *  - эти мелочи помогут не допускать ошибок в следующих спринтах
 *
 * Что сделано хорошо:
 * - Заблокирована кнопка отправки формы по умолчанию
 * - Нет лишней ллогики
 * - Имена переменных хорошо подобраны
 * - Имеются уместные комментарии
 * - Использован use strict
 *
 * Что можно улучшить(необязательно):
 * - (+) Закрывать попап по нажатию ESC(можно к примеру слушать событие keydown на window и проверять event.key === `Escape`)
 * - (+) Закрывать попап по клику вне формы
 * - (+) Использовать const вместо let, где возможно.
 Это хорошая практика и поможет избежать возможных ошибок при непреднамеренном изменении переменных
 * - (+) initialCards можно вынести в отдельный файл и подключить его перед script.js 
 * - (+) Кнопка отправки формы можно блокировать при очищении полей формы, а не только при открытии формы
 * - (+) Код можно лучше разбить на логические части(обьявления переменных для элементов, обьявления обработчиков, обьявления функций, привязка обработчиков, инициализация)
 *
 **/

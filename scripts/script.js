document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const getData = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();

    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) return;

      if (request.status === 200) {
        const response = JSON.parse(request.response);
        callback(response);
      } else {
        console.log(new Error('Eror:' + request.status));
      }
    });
  };

  const tabs = () => {
    const cardDetailChangeElems = document.querySelectorAll('.card-detail__change ');
    let cardDetailTitleElem = document.querySelector('.card-details__title ');
    let cardImageItemElem = document.querySelector('.card__image_item ');
    let cardDetailsPriceElem = document.querySelector('.card-details__price ');
    let descriptionMemoryElem = document.querySelector('.description__memory');

    const data = [
      {
        phone: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
        img: 'img/iPhone-graphite.png',
        price: 40000,
        memoryRom: 128,
      },
      {
        phone: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
        img: 'img/iPhone-silver.png',
        price: 45000,
        memoryRom: 256,
      },
      {
        phone: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
        img: 'img/iPhone-blue.png',
        price: 40000,
        memoryRom: 128,
      },
    ];

    const removeClass = () => {
      cardDetailChangeElems.forEach((btn) => btn.classList.remove('active'));
    };

    cardDetailChangeElems.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) {
          removeClass();
          btn.classList.add('active');
          cardImageItemElem.src = data[i].img;
          cardDetailTitleElem.textContent = data[i].phone;
          cardImageItemElem.alt = data[i].name;
          cardDetailsPriceElem.textContent = data[i].price + '₴';
          descriptionMemoryElem.textContent = `Встроенная память (ROM) ${data[i].memoryRom} ГБ`;
        }
      });
    });
  };

  const showCharacteristics = () => {
    const characteristicsListElem = document.querySelector('.characteristics__list');
    const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

    const open = (button, dropDown) => {
      closeAllDropDown();
      dropDown.style.height = `${dropDown.scrollHeight}px`;
      button.classList.add('active');
      dropDown.classList.add('active');
    };

    const close = (button, dropDown) => {
      button.classList.remove('active');
      dropDown.classList.remove('active');
      dropDown.style.height = '';
    };

    const closeAllDropDown = (button, dropDown) => {
      characteristicsItemElems.forEach((elem) => {
        close(elem.children[0], elem.children[1]);
      });
    };

    characteristicsListElem.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('characteristics__title')) {
        const getParent = target.closest('.characteristics__item');
        const description = getParent.querySelector('.characteristics__description');
        description.classList.contains('active') ? close(target, description) : open(target, description);
      }
      document.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.closest('.characteristics__list')) {
          closeAllDropDown();
        }
      });
    });
  };

  const modal = () => {
    const cardDetailsButtonBuyElem = document.querySelector('.card-details__button_buy');
    const cardDetailsButtonDeliveryElem = document.querySelector('.card-details__button_delivery');
    const modalWindow = document.querySelector('.modal');
    const cardDetailTitleElem = document.querySelector('.card-details__title ');
    const modalTitleElem = document.querySelector('.modal__title ');
    const modalSubTitleElem = document.querySelector('.modal__subtitle ');

    const openModal = (event) => {
      const target = event.target;
      modalWindow.classList.add('open');
      document.addEventListener('keydown', escapeModalClose);
      modalTitleElem.textContent = cardDetailTitleElem.textContent;
      modalSubTitleElem.textContent = target.dataset.buttonBuy;
    };
    const closeModal = () => {
      modalWindow.classList.remove('open');
      document.removeEventListener('keydown', escapeModalClose);
    };

    // Close modalWindow on ESCAPE

    const escapeModalClose = (event) => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    cardDetailsButtonDeliveryElem.addEventListener('click', openModal);
    cardDetailsButtonBuyElem.addEventListener('click', openModal);

    //  Close modalWindow on click on button X and click on overlay

    modalWindow.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('modal__close') || target === modalWindow) {
        closeModal();
      }
    });
  };

  const renderCrossSell = () => {
    const crossSellList = document.querySelector('.cross-sell__list');

    const createCrossSellItem = (good) => {
      const liItem = document.createElement('li');
      liItem.innerHTML = `
        <article class="cross-sell__item">
          <img class="cross-sell__image" src="${good.photo}" alt="" />
          <h3 class="cross-sell__title">${good.name}</h3>
          <p class="cross-sell__price">${good.price}</p>
          <div class="button button_buy cross-sell__button">Купить</div>
        </article>
      `;

      return liItem;
    };

    const createCrossSellList = (goods) => {
      goods.forEach((item) => {
        crossSellList.append(createCrossSellItem(item));
      });
    };

    getData('cross-sell-dbase/dbase.json', createCrossSellList);
  };

  tabs();
  showCharacteristics();
  modal();
  renderCrossSell();
});

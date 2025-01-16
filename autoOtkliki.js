const getJob = async () => {
    console.log("Начинаю поиск вакансий");
    const vacansyLength = document.querySelectorAll('[data-qa="vacancy-serp__vacancy_response"]').length
    let counter = 0
  
    while(counter < vacansyLength){
      try {
            await findElementFunc()
            counter += 1
          } catch (error) {
        throw new Error("Произошла ошибка:", error);
      }
    }
  
  }
  
  const findElementFunc = async () => {
    try {
      const childElementResponseVacancy = document.querySelector('[data-qa="vacancy-serp__vacancy_response"]')
  
      if (!childElementResponseVacancy) {
        console.log(" элемент отклика не найден, пропускаем вакансию.");
        return false
      }
  
        console.log("Найдена вакансия без отклика")
  
        childElementResponseVacancy.scrollIntoView({ behavior: 'smooth', block: 'center' })
  
        
        await clickEndSendLetter(childElementResponseVacancy)
        console.log("Клик по кнопке 'Подтвердить' произошел")
        return true
      
    } catch (error) {
      throw new Error("Произошла ошибка:", error);
    }

  }
  
  const clickEndSendLetter =  async (element) => {
    try {
      element.click();
  
      await delay(4000);
      await findButtonToWriteLetter();
  
      await delay(4000);
      const result1 = await findTextArea();
      if(!result1){console.log("result1 empty")}

      await delay(2000);
      const result2 = await sendLetter();
      
      if(result2){
        await delay(2000);
        const result3 = await findEye();

        if(result3){
          await delay(2000);
          await unvisibleVakansy();
        }
      }
      
    } catch (error) {
        throw new Error("Произошла ошибка:", error);
    }
  }
  
    
  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  const findButtonToWriteLetter = async () => {
    const findButtonToWriteLetter = document.querySelector('[data-qa="vacancy-response-letter-toggle"]');
  
    if(!findButtonToWriteLetter){
      return false
    }
  
    findButtonToWriteLetter.click()
    console.log("Ткнули в сопроводительное письмо, далее заполнение")
    return true
  }
  
  const findTextArea = async () => {
    const doc1 = document.querySelector('[data-qa="textarea-native-wrapper"] textarea');
    const doc2 = document.querySelector('[data-qa="vacancy-response-popup-form-letter-input"]');
    const textarea = doc1 || doc2;  

    if (!textarea) {
     throw new Error("Textarea not found");
    }
  
    console.log("Нашли textarea")
      
    textarea.value = 'Добрый день! Меня заинтересовала возможность присоединиться к вашей команде в качестве фронтенд разработчика. С учетом моего стажа работы в этой области, я считаю, что могу внести ценный вклад в проекты, которыми занимается ваша компания. Tg @MakshakovS';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    console.log("Текст вставлен")
    return true
  }
  
  
  const sendLetter = async () => {
    const element1 = document.querySelector('[data-qa="vacancy-response-letter-submit"]');
    const element2 = document.querySelector('[data-qa="vacancy-response-submit-popup"]');
    const elementSubmitLetter = element1 || element2

    if (!elementSubmitLetter) {
      console.log("Кнопка отправки не найдена");
  
      throw new Error("Кнопка отправки не найдена")
    }

    elementSubmitLetter.click();
    console.log("Текст отправлен")
    return true
  }
  
  const findEye = async () => {
    const elementEye = document.querySelector('[data-qa="vacancy__blacklist-show-add"]');
    if (!elementEye) {
      throw new Error("Кнопка скрытия вакансии не найдена");
    }
  
    elementEye.click();
    console.log("Клик на глаз")
    return true
  }
  
  const unvisibleVakansy = async () => {
    const elementHiddenEye = document.querySelector('[data-qa="vacancy__blacklist-menu-add-vacancy"]');
    if(!elementHiddenEye){
      console.log("Кнопка скрытия вакансии не найдена");
  
      return false
     }
  
     elementHiddenEye.click()
     console.log("Вакансия скрыта")
     return true
  }
  getJob()
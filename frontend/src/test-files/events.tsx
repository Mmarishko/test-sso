export const EventCapture = () => {
  let parent1 = document.getElementById('parent1')

  let child1 = document.getElementById('child1')

  parent1?.addEventListener('click', function () {
    console.log('Родитель (всплытие)')
  })

  child1?.addEventListener('click', function () {
    console.log('Ребёнок (цель)')
  })

  // Обработчик на фазе погружения
  parent1?.addEventListener(
    'click',
    function () {
      console.log('Родитель (погружение)')
    },
    true
  ) // третий параметр true = capture фаза

  return (
    <div id="parent1">
      <button id="child1">Кликни</button>
    </div>
  )
}

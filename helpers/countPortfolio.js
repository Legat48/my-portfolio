export default (item) => {
  let count = 0

  function countNamesRecursively (obj) {
    if (obj.name) {
      count++
    }

    if (obj.children && obj.children.length) {
      for (const child of obj.children) {
        countNamesRecursively(child)
      }
    }
  }
  if (Array.isArray(item)) {
    item.forEach((e) => {
      countNamesRecursively(e)
    })
  } else {
    console.log(item)
    countNamesRecursively(item)
  }
  return count
}

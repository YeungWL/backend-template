export function findComponentUpward(context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }

  return parent
}

export function findComponentsUpward(context, componentName, components = []) {
  let parent = context.$parent
  let name = parent.$options.name

  while (parent && name) {
    if (componentName === name) {
      components.push(parent)
    }

    parent = parent.$parent
    if (parent) {
      name = parent.$options.name
    }
  }

  return components
}

export function findComponentDownward(context, componentName) {
  const childrens = context.$children
  let children

  if (childrens.length) {
    childrens.forEach(child => {
      if (child.$options.name === componentName) {
        children = child
      }
    })

    for (let i = 0, len = childrens.length; i < len; i++) {
      const child = childrens[i]
      const name = child.$options.name

      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }

  return children
}

export function findComponentsDownward(context, componentName, components = []) {
  const childrens = context.$children

  if (childrens.length) {
    childrens.forEach(child => {
      const subChildren = child.$children
      const name = child.$options.name

      if (name === componentName) {
        components.push(child)
      }
      if (subChildren.length) {
        const findChildren = findComponentsDownward(child, componentName, components)
        if (findChildren) {
          components.concat(findChildren)
        }
      }
    })
  }

  return components
}

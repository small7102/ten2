//模拟call的实现
Function.prototype.call1 = function(context) {
  context = context || window
  context.fn = this

  var args = []

  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }

  var result = eval('context.fn('+args+')')
  delete context.fn
  return result
}

//模拟applay的实现
Function.prototype.apply1 = function (context, arr) {
  context = context || window
  context.fn = this

  var args = []
  var result

  if (!arr) {
    result = context.fn()
  } else {
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i])
    }
    result = eval('context.fn('+args+')')
  }

  delete context.fn
  return result
}

# Loopy

Nested Loops.

## Example usage

With a single loop:

```js
const loop = new Loopy({
  iterations: 5,
  delay: 500,
  onLoop(i) {
    // do something on each iteration
    alert("Loop number: " + i);
  },
  onLoopEnd() {
    // do something when the loop has completed
    alert("All done!");
  }
});

loop.start();
```

With multiple nested loops:

```js
const loop = new Loopy([
  {
    iterations: 5,
    delay: 500,
    onLoop(i) {
      // Do something and then loop through sub-loops!
    },
    onLoopEnd() {
      // All finished!
    }
  },
  {
    iterations: 10,
    delay: 1000,
    onLoop(i) {
      // Do something
    },
    onLoopEnd() {
      // Sub-loop finished, resume looping through top loop!
    }
  }
]);

loop.start();
```

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observable = exports.FlushPolicyBase = void 0;
/**
 * A simple observable value or object
 */
class Observable {
  constructor(value) {
    this.internalValue = value;
    this.observers = [];
  }
  get value() {
    return this.internalValue;
  }
  set value(v) {
    this.internalValue = v;
    for (const observer of this.observers) {
      observer(this.internalValue);
    }
  }
  onChange(observer) {
    const n = this.observers.push(observer);
    return () => {
      this.observers.splice(n - 1, 1);
    };
  }
}

/**
 * FlushPolicy defines the strategy for executing flushes
 * (uploading events to destinations)
 */
exports.Observable = Observable;
/**
 * A Base Class for implementing a FlushPolicy.
 *
 * Initializes the shouldFlush value to false and sets it to false on reset
 */
class FlushPolicyBase {
  shouldFlush = new Observable(false);
  reset() {
    this.shouldFlush.value = false;
  }
  end() {
    // Nothing to cleanup
  }
}
exports.FlushPolicyBase = FlushPolicyBase;
//# sourceMappingURL=types.js.map
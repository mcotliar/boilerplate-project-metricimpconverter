class BiMap {
    constructor() {
      this.forwardMap = new Map();
      this.reverseMap = new Map();
    }
  
    set(key, value) {
      if (this.reverseMap.has(value)) {
        this.forwardMap.delete(this.reverseMap.get(value));
      }
      this.forwardMap.set(key, value);
      this.reverseMap.set(value, key);
    }
  
    get(key) {
      return this.forwardMap.get(key);
    }
  
    getByValue(value) {
      return this.reverseMap.get(value);
    }
  
    delete(key) {
      const value = this.forwardMap.get(key);
      if (value) {
        this.forwardMap.delete(key);
        this.reverseMap.delete(value);
      }
      return value;
    }
  
    deleteByValue(value) {
      const key = this.reverseMap.get(value);
      if (key) {
        this.forwardMap.delete(key);
        this.reverseMap.delete(value);
      }
      return key;
    }
  
    has(key) {
      return this.forwardMap.has(key);
    }
  
    hasValue(value) {
      return this.reverseMap.has(value);
    }
  
    size() {
      return this.forwardMap.size;
    }
  }
  
module.exports = BiMap;
//   // Example usage
//   const bimap = new BiMap();
//   bimap.set("apple", "red");
//   bimap.set("banana", "yellow");
  
//   console.log(bimap.get("apple")); // Output: "red"
//   console.log(bimap.getByValue("yellow")); // Output: "banana"
  
//   bimap.delete("banana");
//   console.log(bimap.hasValue("yellow")); // Output: false
  
//   console.log(bimap.size()); // Output: 1
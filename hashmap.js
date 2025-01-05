class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    // Hash function to calculate the index for a given key
    _hash(key) {
        let hash = 0;
        const prime = 31;
        for (let i = 0; i < key.length; i++) {
            hash = (hash * prime + key.charCodeAt(i)) % this.capacity;
        }
        return hash;
    }

    set(key, value) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.size++;
        if (this.size > this.capacity * this.loadFactor) {
            this._resize();
        }
    }

    get(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return undefined;
    }

    remove(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                const value = bucket[i][1];
                bucket.splice(i, 1);
                this.size--;
                return value;
            }
        }
        return undefined;
    }

    has(key) {
        return this.get(key) !== undefined;
    }

    length() {
        return this.size;
    }

    clear() {
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    keys() {
        const keys = [];
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                keys.push(key);
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                values.push(value);
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                entries.push([key, value]);
            }
        }
        return entries;
    }

    _resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
        for (const bucket of oldBuckets) {
            for (const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }
}

module.exports = HashMap;
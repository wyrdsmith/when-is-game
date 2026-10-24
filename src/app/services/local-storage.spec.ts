import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setItem and getItem should work for strings', () => {
    const key = 'testString';
    const value = 'hello world';

    service.setItem(key, value);
    const result = service.getItem<string>(key);

    expect(result).toBe(value);
  });

  it('setItem and getItem should work for objects', () => {
    const key = 'testObject';
    const value = { id: 1, name: 'Test' };

    service.setItem(key, value);
    const result = service.getItem<typeof value>(key);

    expect(result).toEqual(value);
  });

  it('getItem should return null if item does not exist', () => {
    const result = service.getItem('nonExistentKey');

    expect(result).toBeNull();
  });

  it('removeItem should remove an item', () => {
    const key = 'toRemove';
    service.setItem(key, 'data');
    service.removeItem(key);

    const result = service.getItem(key);
    expect(result).toBeNull();
  });

  it('clear should remove all items', () => {
    service.setItem('key1', 'value1');
    service.setItem('key2', 'value2');

    service.clear();

    expect(service.getItem('key1')).toBeNull();
    expect(service.getItem('key2')).toBeNull();
  });

  it('should handle different data types correctly', () => {
    const tests = [
      { key: 'number', value: 123 },
      { key: 'boolean', value: true },
      { key: 'array', value: [1, 2, 3] },
      { key: 'null', value: null },
      { key: 'undefined', value: undefined }, // undefined values might be stored as "null" in practice depending on stringify, but getItem handles it
      { key: 'empty_string', value: "" },
      { key: 'empty_object', value: {} },
    ];

    tests.forEach(test => {
      service.setItem(test.key, test.value);
      // Need to cast expected for undefined/null if strict
      const expected = (typeof test.value === 'undefined') ? "null" : test.value;
      const result = service.getItem(test.key);
      expect(result).toEqual(expected);
    });
  });

  it('should handle browser storage errors gracefully', () => {
    // Mock localStorage to throw error
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = () => { throw new Error('Storage full'); };

    const key = 'errorTest';
    const value = 'test';

    // Should not throw an error in the service
    service.setItem(key, value);

    // Restore original method
    localStorage.setItem = originalSetItem;
  });
});

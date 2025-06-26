import Ukrtb from '../src';
import Schedule from '../src/features/schedule';
import Student from '../src/features/student';
import { describe, expect, it } from 'vitest';
import Lists from '../src/features/lists';

describe('Класс Ukrtb', () => {
  it('выбрасывает ошибку, если API-ключ не передан', () => {
    expect(() => new Ukrtb()).toThrow('API key is required');
  });

  it('создаёт экземпляр с валидным API-ключом', () => {
    const apiKey = 'validApiKey';
    const ukrtb = new Ukrtb(apiKey);
    expect(ukrtb.apiKey).toBe(apiKey);
    expect(ukrtb.schedule).toBeInstanceOf(Schedule);
    expect(ukrtb.student).toBeInstanceOf(Student);
    expect(ukrtb.lists).toBeInstanceOf(Lists);
  });

  it('инициализирует свойства schedule и student', () => {
    const ukrtb = new Ukrtb('validApiKey');
    expect(ukrtb.schedule).toBeDefined();
    expect(ukrtb.student).toBeDefined();
    expect(ukrtb.lists).toBeDefined();
  });
});

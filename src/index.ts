import Schedule from './features/schedule';
import Student from './features/student';
import Lists from './features/lists';

/**
 * Класс, представляющий API-сервис учебного портала.
 * @class Ukrtb
 */
class Ukrtb {
  /** API-ключ для доступа к сервису */
  public readonly apiKey: string;

  /** Модуль для работы с расписанием */
  public readonly schedule: Schedule;

  /** Модуль для работы со студентами */
  public readonly student: Student;

  /** Модуль для получения списков групп, преподавателей и кабинетов */
  public readonly lists: Lists;

  /**
   * Создает новый экземпляр API-клиента.
   * @param {string} apiKey - API-ключ для доступа к сервису
   * @throws {Error} Если API-ключ не передан
   */
  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }

    this.apiKey = apiKey;
    this.schedule = new Schedule(apiKey);
    this.student = new Student(apiKey);
    this.lists = new Lists(apiKey);
  }
}

export default Ukrtb;

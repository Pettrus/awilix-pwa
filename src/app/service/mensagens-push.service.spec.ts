import { TestBed } from '@angular/core/testing';

import { MensagensPushService } from './mensagens-push.service';

describe('MensagensPushService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensagensPushService = TestBed.get(MensagensPushService);
    expect(service).toBeTruthy();
  });
});

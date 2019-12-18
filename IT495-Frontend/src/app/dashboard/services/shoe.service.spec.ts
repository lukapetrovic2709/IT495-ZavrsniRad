import { TestBed } from "@angular/core/testing";

import { ShoeService } from "./shoe.service";

describe("DashboardService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ShoeService = TestBed.get(ShoeService);
    expect(service).toBeTruthy();
  });
});

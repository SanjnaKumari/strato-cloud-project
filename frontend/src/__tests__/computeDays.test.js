

function computeDays(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  return Math.floor((now - date) / (1000 * 60 * 60 * 24));
}

describe("computeDays", () => {
  it("returns 0 for today's date", () => {
    const today = new Date().toISOString().split("T")[0];
    expect(computeDays(today)).toBe(0);
  });

  it("returns 10 for a date 10 days ago", () => {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    expect(computeDays(tenDaysAgo.toISOString().split("T")[0])).toBe(10);
  });
});

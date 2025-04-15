package PipelinePioneers.example.analytics_service;

public class AnalyticsSummary {
    private String data;
    private int count;

    public AnalyticsSummary(String data, int count) {
        this.data = data;
        this.count = count;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}

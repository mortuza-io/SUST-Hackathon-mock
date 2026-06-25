import express from "express";
import classifier from "./classifier.js";

const app = express();

app.use(express.json());

app.get("/health",(req,res)=>{
    res.json({
        massage:"service health in good"
    })
})

app.post("/sort-ticket", (req,res) => {
    const { ticket_id, message } = req.body;

    if (!ticket_id || !message) {
        return res.status(400).json({
            error: "ticket_id and message are required"
        });
    }

    const result = classifier(message);

    const response = {
        ticket_id,
        case_type: result.case_type,
        severity: result.severity,
        department: result.department,
        agent_summary: `Customer reports: ${message.substring(0, 120)}`,
        human_review_required: result.human_review_required,
        confidence: result.confidence
    };

    res.json(response);
});



app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
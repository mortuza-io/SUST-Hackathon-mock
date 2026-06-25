function classifier(message) {
    const text = message.toLowerCase();

    let case_type = "other";
    let severity = "low";
    let department = "customer_support";
    let confidence = 0.70;

    if (
        text.includes("wrong number") ||
        text.includes("wrong recipient") ||
        text.includes("sent by mistake")
    ) {
        case_type = "wrong_transfer";
        severity = "high";
        department = "dispute_resolution";
        confidence = 0.90;
    }

    else if (
        text.includes("payment failed") ||
        text.includes("transaction failed") ||
        text.includes("balance deducted") ||
        text.includes("money deducted")
    ) {
        case_type = "payment_failed";
        severity = "high";
        department = "payments_ops";
        confidence = 0.90;
    }

    else if (
        text.includes("refund") ||
        text.includes("money back")
    ) {
        case_type = "refund_request";
        severity = "low";
        department = "customer_support";
        confidence = 0.88;
    }

    else if (
        text.includes("otp") ||
        text.includes("pin") ||
        text.includes("password") ||
        text.includes("scam") ||
        text.includes("fraud")
    ) {
        case_type = "phishing_or_social_engineering";
        severity = "critical";
        department = "fraud_risk";
        confidence = 0.98;
    }

    const human_review_required =
        severity === "critical" ||
        case_type === "phishing_or_social_engineering";

    return {
        case_type,
        severity,
        department,
        confidence,
        human_review_required
    };
}
export default classifier;
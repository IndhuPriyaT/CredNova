def calculate_crednova_score(transaction_consistency, income_stability, spending_discipline, carbon_footprint_bonus):
    """
    Calculates the CredNova alternate credit score.
    
    Inputs:
    - transaction_consistency (0-100): Regularity of positive transactions
    - income_stability (0-100): Reliability and frequency of income
    - spending_discipline (0-100): Control over discretionary spending
    - carbon_footprint_bonus (0-50): Bonus points for sustainable behavior
    
    Returns:
    - dict containing: final_score (0-1000), category, and explanation
    """
    
    # Each core metric (0-100) contributes up to 300 points (900 total base)
    score_from_transactions = transaction_consistency * 3
    score_from_income = income_stability * 3
    score_from_spending = spending_discipline * 3
    
    financial_score = score_from_transactions + score_from_income + score_from_spending
    
    # Sustainability bonus (0-50) contributes up to 100 points
    sustainability_score = carbon_footprint_bonus * 2
    
    # Final Score (Max 1000)
    final_score = int(financial_score + sustainability_score)
    
    # Determine Category
    if final_score >= 750:
        category = "Good"
    elif final_score >= 550:
        category = "Average"
    else:
        category = "Poor"
        
    # Generate Explanations
    explanations = []
    
    if income_stability >= 80:
        explanations.append("Regular income detected.")
    elif income_stability <= 40:
        explanations.append("Income shows high variability.")
        
    if transaction_consistency >= 80:
        explanations.append("Consistent daily transactions found.")
    elif transaction_consistency <= 40:
        explanations.append("Irregular transaction gaps detected.")
        
    if spending_discipline >= 80:
        explanations.append("Excellent spending discipline with minimal spikes.")
    elif spending_discipline <= 40:
        explanations.append("Frequent spending spikes detected.")
        
    if carbon_footprint_bonus >= 35:
        explanations.append("High sustainability bonus applied for eco-friendly choices.")
    elif carbon_footprint_bonus >= 15:
        explanations.append("Moderate low-carbon footprint bonus applied.")
        
    if not explanations:
        explanations.append("Standard financial behavior detected.")
        
    return {
        "final_score": final_score,
        "category": category,
        "explanation": " ".join(explanations)
    }

# Example Usage
if __name__ == "__main__":
    result = calculate_crednova_score(
        transaction_consistency=85,
        income_stability=90,
        spending_discipline=70,
        carbon_footprint_bonus=40
    )
    
    print(f"Final Score: {result['final_score']}/1000")
    print(f"Category: {result['category']}")
    print(f"Explanation: {result['explanation']}")

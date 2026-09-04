def calculate_savings(price: float, original_price: float) -> dict:
    """Calculates savings and discount percentage between current and original price."""
    if original_price <= price or original_price == 0:
        return {"savings": 0.0, "discountPercent": 0}
    
    savings = round(original_price - price, 2)
    discount_percent = round((savings / original_price) * 100)
    return {
        "savings": savings,
        "discountPercent": discount_percent
    }

def calculate_mission_totals(products: list[dict], est_tax_rate: float = 0.08) -> dict:
    """Calculates total budget breakdown across multiple recommended products."""
    if not products:
        return {"totalPrice": 0.0, "totalSavings": 0.0, "estTax": 0.0, "grandTotal": 0.0}

    total_price = sum(p.get("price", 0) for p in products)
    total_orig = sum(p.get("originalPrice", p.get("price", 0)) for p in products)
    total_savings = round(total_orig - total_price, 2) if total_orig > total_price else 0.0
    est_tax = round(total_price * est_tax_rate, 2)
    grand_total = round(total_price + est_tax, 2)

    return {
        "totalPrice": round(total_price, 2),
        "totalSavings": total_savings,
        "estTax": est_tax,
        "grandTotal": grand_total
    }

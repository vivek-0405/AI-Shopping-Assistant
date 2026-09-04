import json
import logging
from backend.tools.product_search import search_products
from backend.tools.web_search import search_web
from backend.tools.calculator import calculate_mission_totals
from backend.agent.memory import agent_memory

logger = logging.getLogger("growthpilot.agent")

class GrowthPilotAgent:
    def __init__(self):
        self.name = "GrowthPilot AI Agent"

    def run_mission(self, user_query: str, session_id: str = "default") -> dict:
        """
        Executes an autonomous shopping and market comparison mission across multiple sites.
        """
        logger.info(f"Agent starting mission for: {user_query}")
        
        # Step 1: Real-time product search across online sites
        products = search_products(user_query)

        # Step 2: Fetch live web search insights
        web_insights = search_web(f"{user_query} comparison market analysis 2026", max_results=3)
        sources = [item.get("url") for item in web_insights if item.get("url")]

        # Step 3: Financial & savings calculation
        totals = calculate_mission_totals(products)

        # Step 4: Construct structured mission result
        result = {
            "mission": {
                "id": f"mission-{int(hash(user_query)) % 1000000}",
                "title": f"Growth Shopping Mission: {user_query[:40].title()}",
                "summary": f"Analyzed top market offerings across multiple online sites for '{user_query}'. Aggregated verified prices, specs, and price-to-performance ratings.",
                "budget": totals["grandTotal"],
                "currency": "USD",
                "totalSavings": totals["totalSavings"],
                "sourcesCount": len(sources)
            },
            "recommendations": products,
            "comparison": {
                "features": [
                    {"name": "Price Point", "values": {p["id"]: f"${p['price']}" for p in products}},
                    {"name": "Match Rating", "values": {p["id"]: f"{p['rating']} / 5.0" for p in products}},
                    {"name": "Availability", "values": {p["id"]: "In Stock" if p.get("inStock") else "Pre-order" for p in products}}
                ]
            },
            "webInsights": web_insights,
            "sources": sources
        }

        # Store in session memory
        agent_memory.add_interaction(session_id, user_query, result)
        return result

growthpilot_agent = GrowthPilotAgent()

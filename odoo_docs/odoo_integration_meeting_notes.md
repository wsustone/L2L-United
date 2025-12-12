# Odoo Integration Meeting Notes

_Date:_
_Participants:_
_Odoo Contact:_

---

## 1. Overall / Project-Level

- **Deployment & Version**  
  - Which Odoo version will we be on now and over the next 2–3 years?  
    - Notes:  
  - Is this Odoo Online, Odoo.sh, or on-prem?  
    - Notes:  
  - Any planned upgrade timeline (e.g., move to Odoo 20)?  
    - Notes:  

- **Modules & Licensing**  
  - Which exact apps/modules will be enabled (CRM, Inventory, Manufacturing, Accounting, Invoicing, Documents, Sign, others)?  
    - Notes:  
  - Any features in those apps that are Enterprise-only or require extra licenses?  
    - Notes:  

- **Environments**  
  - How many environments (dev/test/stage/prod) will we get?  
    - Notes:  
  - How are sandboxes created and refreshed? Can we have dedicated integration test instances?  
    - Notes:  

---

## 2. Integration & API (Technical)

- **API Choice & Stability**  
  - Is the recommended interface for new integrations the JSON-2 external API (HTTP/JSON)?  
    - Notes:  
  - Are there any areas where we must still use XML-RPC / JSON-RPC?  
    - Notes:  
  - What is your deprecation / versioning policy for JSON-2 and other APIs?  
    - Notes:  

- **Authentication & Security**  
  - What auth methods are supported: OAuth2, API keys, technical user, SSO?  
    - Notes:  
  - Can we get service accounts that are separate from human users?  
    - Notes:  
  - How is access scoped (per company, per app, per record rules)?  
    - Notes:  

- **Events & Webhooks**  
  - Do you support webhooks or push notifications (e.g., on opportunity updates, stock moves, MO state changes, invoice paid, document signed)?  
    - Notes:  
  - If not, what’s the recommended change tracking approach (polling, audit fields, etc.)?  
    - Notes:  

- **Performance & Limits**  
  - What are the API rate limits and recommended bulk APIs (batch create/update)?  
    - Notes:  
  - Recommended maximum payload sizes and typical performance expectations?  
    - Notes:  

- **Customization vs Standard**  
  - For our use cases, do you foresee a need for custom modules or mostly standard configuration?  
    - Notes:  
  - How do custom fields and custom models surface through the JSON-2 API?  
    - Notes:  

---

## 3. CRM

- **Data Model**  
  - How are leads, opportunities, customers, and contacts structured?  
    - Notes:  
  - Recommended way to model accounts vs contacts vs companies?  
    - Notes:  

- **Process & Automation**  
  - How are pipelines, stages, and teams modeled? Can these be driven/updated via API?  
    - Notes:  
  - How do we trigger or read activities, emails, and notes via API?  
    - Notes:  

- **Integrations**  
  - Best practices for integrating with external CRM/marketing tools (if any).  
    - Notes:  
  - How should we link our system’s IDs to Odoo records (external IDs or custom fields)?  
    - Notes:  

---

## 4. Inventory & Manufacturing (MRP)

- **Inventory Data Model**  
  - How should we model warehouses, locations, lots/serials, units of measure, product variants?  
    - Notes:  
  - How do we access stock levels (on-hand, forecast, reserved) via API?  
    - Notes:  

- **Operations & Transactions**  
  - How are stock moves, pickings, and transfers exposed via the API?  
    - Notes:  
  - Recommended pattern for integration with external WMS/MES if needed?  
    - Notes:  

- **Manufacturing**  
  - How are BOMs, work centers, operations, and manufacturing orders structured?  
    - Notes:  
  - Which events can we hook into: MO created, started, completed, canceled?  
    - Notes:  

---

## 5. Accounting & Invoicing

- **Compliance & Localization**  
  - Which localization / tax modules should we use for our country/region?  
    - Notes:  
  - How do you handle multi-currency, multi-company, and tax rules in our jurisdiction?  
    - Notes:  

- **Process Flow**  
  - What is your recommended flow (Quote → Sales Order → Delivery → Invoice → Payment)?  
    - Notes:  
  - At which steps do you recommend we integrate (creating orders, pushing invoices, syncing payments)?  
    - Notes:  

- **API Capabilities**  
  - Can we fully manage invoices, credit notes, payments, and reconciliations through the API?  
    - Notes:  
  - Any restrictions on what account moves can be created/modified externally?  
    - Notes:  

---

## 6. Documents & Sign

- **Documents App**  
  - Best practice for using Documents as a repository for contracts, manufacturing docs, QA docs, etc.?  
    - Notes:  
  - API options for uploading/downloading documents and linking them to CRM records, orders, manufacturing orders, invoices, etc.?  
    - Notes:  

- **Sign App**  
  - How to create signature templates, send them for signing, and track status via API?  
    - Notes:  
  - Do you provide webhooks/events when a document is signed/declined/expired?  
    - Notes:  
  - Any legal aspects we should know (eIDAS / ESIGN / country-specific requirements)?  
    - Notes:  

---

## 7. Data Migration, Reporting, and Governance

- **Initial Migration**  
  - Recommended approach and tools for importing existing CRM, inventory, and accounting data?  
    - Notes:  
  - How should we handle opening balances and historical transactions?  
    - Notes:  

- **Ongoing Sync & Reporting**  
  - How do you suggest we build reports and dashboards (Odoo vs external BI/data warehouse)?  
    - Notes:  
  - Any recommended way to export data in bulk and keep it in sync for BI tools?  
    - Notes:  

- **Support & Best Practices**  
  - Do you have reference architectures or guides for integrations on our tech stack?  
    - Notes:  
  - What ongoing support/SLA options exist for API/integration issues?  
    - Notes:  

---

## Action Items / Decisions

- **Key Decisions Made**  
  -  

- **Follow-Ups / Next Steps**  
  -  

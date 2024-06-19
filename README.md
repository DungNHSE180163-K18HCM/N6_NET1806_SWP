# Jewelry Customization Management Software README

## Project Introduction

### Overview

This project involves developing a jewelry customization management software for a jewelry manufacturing company. The software allows customers to request custom-made jewelry based on the company's designs or their own specifications. It also manages the entire jewelry customization process from customer request to final delivery.

### Key Features (Epics)

1. **Home Page (FR-04):** Introduces the company, showcases the jewelry collection, designs, and shares blogs.
2. **Customer Customization Requests (FR-11, FR-13):** Allows customers to place orders for custom jewelry, either based on company designs or their own.
3. **Jewelry Customization Process Management (FR-17, FR-18):** Manages the workflow of jewelry customization from request to delivery.
4. **Cost and Pricing Management (FR-16):** Updates and manages the cost and pricing of custom orders based on material costs and labor.
5. **Payment and Cancellation Policies (FR-19):** Defines payment policies and order cancellation rules.
6. **Gold and Gemstone Pricing (FR-20):** Manages the pricing of gold and gemstones used in the jewelry.
7. **Design Templates and Cost Estimation (FR-15):** Provides design templates with cost estimation.
8. **Dashboard and Reporting (FR-24, FR-25):** Offers statistical dashboards and reports for management.

### Technology Stack

- **Frontend:** HTML, CSS, JavaScript, React.js
- **Backend:** Java, Spring Boot, Hibernate
- **Database:** Microsoft SQL Server, PostgreSQL Server, Firebase Firestore, Firebase Storage
- **Authentication:** JWT, OAuth
- **Hosting:** Render

### Team Members and Responsibilities

| Member                 | Responsibility                        |
|------------------------|---------------------------------------|
| Nguyễn Hoàng DŨng      | Frontend Development, UI/UX Design    |
| Đặng Nhật Phi          | Backend Development, API Integration  |
| Cao Hoàng Thanh        | Database Design, Management           |
| Ngô Quang Phước Thành  | Authentication and Security           |
| Nguyễn Trọng Phúc      | Project Management, QA Testing        |

### Illustrative Designs (Figma)

- **![Figma Link](https://www.figma.com/design/0qeN7asu2EXenfUdPzkdNy/SWP391web?node-id=230-353&t=pG8f2wdUkk6rX900-1)**

## Features in Detail

### 1. Home Page
- Introduces the company.
- Showcases jewelry collections and designs.
- Shares blogs related to jewelry and fashion.

### 2. Customer Customization Requests
- Customers can place orders for custom jewelry.
- Choose from company designs or upload their own designs.

### 3. Jewelry Customization Process Management
- Manages the workflow from request submission to delivery.
- Includes steps: request reception, business communication, quotation approval, design approval, manufacturing, and final delivery.

### 4. Cost and Pricing Management
- Updates the cost of custom orders based on real-time material costs and labor charges.
- Calculates product cost as: `[gold price at time * product weight] + labor cost + gemstone cost`.

### 5. Payment and Cancellation Policies
- Defines company-specific payment policies.
- Provides rules and processes for order cancellations.

### 6. Gold and Gemstone Pricing
- Manages the company's gold and gemstone pricing.
- Regularly updates prices based on market rates.

### 7. Design Templates and Cost Estimation
- Provides predefined design templates.
- Estimates costs for each design template including material and labor.

### 8. Dashboard and Reporting
- Provides a dashboard for management to view statistics.
- Generates reports on various aspects of the customization process.

## Conclusion

This software is designed to streamline the jewelry customization process, ensuring efficient management from customer request to final delivery. By implementing the outlined features, the company can offer a seamless and personalized experience for its customers, enhancing customer satisfaction and operational efficiency.

For more information or to contribute to this project, please contact the project manager, Nguyễn Hoàng Dũng, at [DungNHSE180163@fpt.edu.vn].

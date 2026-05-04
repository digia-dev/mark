-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` VARCHAR(30) NOT NULL,
    `branch_id` INTEGER NULL,
    `phone` VARCHAR(20) NULL,
    `avatar` VARCHAR(255) NULL,
    `department` VARCHAR(100) NULL,
    `address` VARCHAR(255) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `last_login_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    INDEX `users_role_idx`(`role`),
    INDEX `users_branch_id_idx`(`branch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `token` VARCHAR(500) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `refresh_tokens_token_key`(`token`),
    INDEX `refresh_tokens_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `branches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NULL,
    `phone` VARCHAR(20) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_code` VARCHAR(30) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `email` VARCHAR(150) NULL,
    `phone` VARCHAR(20) NOT NULL,
    `website` VARCHAR(150) NULL,
    `npwp` VARCHAR(30) NULL,
    `address` TEXT NULL,
    `city` VARCHAR(100) NULL,
    `province` VARCHAR(100) NULL,
    `postal_code` VARCHAR(10) NULL,
    `lat` DECIMAL(10, 8) NULL,
    `lng` DECIMAL(11, 8) NULL,
    `area` VARCHAR(100) NULL,
    `sector` VARCHAR(100) NULL,
    `contact_person` VARCHAR(100) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'active',
    `sales_id` INTEGER NULL,
    `branch_id` INTEGER NULL,
    `since_date` DATETIME(3) NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `customers_customer_code_key`(`customer_code`),
    INDEX `customers_email_idx`(`email`),
    INDEX `customers_phone_idx`(`phone`),
    INDEX `customers_status_idx`(`status`),
    INDEX `customers_sales_id_idx`(`sales_id`),
    INDEX `customers_area_idx`(`area`),
    INDEX `customers_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `company` VARCHAR(150) NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(150) NULL,
    `address` TEXT NULL,
    `area` VARCHAR(100) NULL,
    `source` VARCHAR(50) NULL,
    `status` VARCHAR(30) NOT NULL DEFAULT 'new',
    `assigned_to` INTEGER NULL,
    `notes` TEXT NULL,
    `follow_up_date` DATETIME(3) NULL,
    `lost_reason` VARCHAR(255) NULL,
    `converted_at` DATETIME(3) NULL,
    `customer_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `leads_phone_idx`(`phone`),
    INDEX `leads_email_idx`(`email`),
    INDEX `leads_status_idx`(`status`),
    INDEX `leads_assigned_to_idx`(`assigned_to`),
    INDEX `leads_follow_up_date_idx`(`follow_up_date`),
    INDEX `leads_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NULL,
    `lead_id` INTEGER NULL,
    `type` VARCHAR(20) NOT NULL,
    `notes` TEXT NOT NULL,
    `next_action` VARCHAR(255) NULL,
    `next_action_date` DATETIME(3) NULL,
    `created_by` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `interactions_customer_id_idx`(`customer_id`),
    INDEX `interactions_lead_id_idx`(`lead_id`),
    INDEX `interactions_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `image_url` VARCHAR(255) NULL,
    `speed_down` INTEGER NULL,
    `speed_up` INTEGER NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `technology` VARCHAR(30) NULL,
    `area_coverage` VARCHAR(255) NULL,
    `is_best_seller` BOOLEAN NOT NULL DEFAULT false,
    `is_promo` BOOLEAN NOT NULL DEFAULT false,
    `promo_price` DECIMAL(15, 2) NULL,
    `promo_end_date` DATETIME(3) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'active',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `products_status_idx`(`status`),
    INDEX `products_category_idx`(`category`),
    INDEX `products_technology_idx`(`technology`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'active',
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `customer_services_customer_id_idx`(`customer_id`),
    INDEX `customer_services_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lead_id` INTEGER NULL,
    `customer_id` INTEGER NULL,
    `sales_id` INTEGER NOT NULL,
    `product_id` INTEGER NULL,
    `name` VARCHAR(200) NOT NULL,
    `stage` VARCHAR(30) NOT NULL,
    `value` DECIMAL(15, 2) NOT NULL,
    `probability` INTEGER NOT NULL DEFAULT 0,
    `source` VARCHAR(50) NULL,
    `area` VARCHAR(100) NULL,
    `expected_close` DATETIME(3) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'active',
    `won_at` DATETIME(3) NULL,
    `lost_at` DATETIME(3) NULL,
    `lost_reason` VARCHAR(255) NULL,
    `notes` TEXT NULL,
    `last_activity_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `deals_stage_idx`(`stage`),
    INDEX `deals_sales_id_idx`(`sales_id`),
    INDEX `deals_status_idx`(`status`),
    INDEX `deals_expected_close_idx`(`expected_close`),
    INDEX `deals_created_at_idx`(`created_at`),
    INDEX `deals_last_activity_at_idx`(`last_activity_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deal_activities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deal_id` INTEGER NOT NULL,
    `type` VARCHAR(30) NOT NULL,
    `description` TEXT NOT NULL,
    `from_value` VARCHAR(100) NULL,
    `to_value` VARCHAR(100) NULL,
    `created_by` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `deal_activities_deal_id_idx`(`deal_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quotations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quot_number` VARCHAR(30) NOT NULL,
    `customer_id` INTEGER NULL,
    `lead_id` INTEGER NULL,
    `deal_id` INTEGER NULL,
    `sales_id` INTEGER NOT NULL,
    `area` VARCHAR(100) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'draft',
    `valid_until` DATETIME(3) NOT NULL,
    `subtotal` DECIMAL(15, 2) NOT NULL,
    `discount` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `tax_rate` DECIMAL(5, 4) NOT NULL DEFAULT 0.11,
    `tax` DECIMAL(15, 2) NOT NULL,
    `total` DECIMAL(15, 2) NOT NULL,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'IDR',
    `notes` TEXT NULL,
    `terms` TEXT NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `parent_id` INTEGER NULL,
    `sent_at` DATETIME(3) NULL,
    `approved_at` DATETIME(3) NULL,
    `rejected_at` DATETIME(3) NULL,
    `pdf_url` VARCHAR(255) NULL,
    `created_by` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `quotations_quot_number_key`(`quot_number`),
    INDEX `quotations_quot_number_idx`(`quot_number`),
    INDEX `quotations_customer_id_idx`(`customer_id`),
    INDEX `quotations_sales_id_idx`(`sales_id`),
    INDEX `quotations_status_idx`(`status`),
    INDEX `quotations_valid_until_idx`(`valid_until`),
    INDEX `quotations_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quotation_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quotation_id` INTEGER NOT NULL,
    `product_id` INTEGER NULL,
    `description` VARCHAR(255) NOT NULL,
    `notes` TEXT NULL,
    `qty` INTEGER NOT NULL,
    `unit` VARCHAR(20) NOT NULL DEFAULT 'unit',
    `unit_price` DECIMAL(15, 2) NOT NULL,
    `discount` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `total` DECIMAL(15, 2) NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `quotation_items_quotation_id_idx`(`quotation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presentations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pres_number` VARCHAR(30) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `customer_id` INTEGER NULL,
    `lead_id` INTEGER NULL,
    `product_id` INTEGER NULL,
    `sales_id` INTEGER NOT NULL,
    `template` VARCHAR(50) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'draft',
    `cover_url` VARCHAR(255) NULL,
    `share_token` VARCHAR(100) NULL,
    `presented_to` VARCHAR(100) NULL,
    `duration_min` INTEGER NULL,
    `location` VARCHAR(255) NULL,
    `presented_at` DATETIME(3) NULL,
    `pdf_url` VARCHAR(255) NULL,
    `notes` TEXT NULL,
    `created_by` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `presentations_pres_number_key`(`pres_number`),
    INDEX `presentations_sales_id_idx`(`sales_id`),
    INDEX `presentations_status_idx`(`status`),
    INDEX `presentations_customer_id_idx`(`customer_id`),
    INDEX `presentations_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presentation_slides` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `presentation_id` INTEGER NOT NULL,
    `sort_order` INTEGER NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `layout` VARCHAR(50) NOT NULL,
    `content_json` JSON NOT NULL,

    INDEX `presentation_slides_presentation_id_idx`(`presentation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `installations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inst_number` VARCHAR(30) NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `deal_id` INTEGER NULL,
    `product_id` INTEGER NULL,
    `sales_id` INTEGER NOT NULL,
    `technician_id` INTEGER NULL,
    `address` TEXT NULL,
    `area` VARCHAR(100) NULL,
    `scheduled_date` DATETIME(3) NOT NULL,
    `start_date` DATETIME(3) NULL,
    `target_end_date` DATETIME(3) NOT NULL,
    `actual_end_date` DATETIME(3) NULL,
    `duration_days` INTEGER NULL,
    `status` VARCHAR(30) NOT NULL DEFAULT 'scheduled',
    `current_stage` VARCHAR(30) NOT NULL DEFAULT 'survey',
    `notes` TEXT NULL,
    `created_by` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `installations_inst_number_key`(`inst_number`),
    INDEX `installations_customer_id_idx`(`customer_id`),
    INDEX `installations_status_idx`(`status`),
    INDEX `installations_scheduled_date_idx`(`scheduled_date`),
    INDEX `installations_technician_id_idx`(`technician_id`),
    INDEX `installations_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `installation_stages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `installation_id` INTEGER NOT NULL,
    `stage_name` VARCHAR(50) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'menunggu',
    `started_at` DATETIME(3) NULL,
    `completed_at` DATETIME(3) NULL,
    `notes` TEXT NULL,
    `sort_order` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `installation_stages_installation_id_idx`(`installation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trouble_tickets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticket_number` VARCHAR(30) NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `service_id` INTEGER NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `category` VARCHAR(50) NULL,
    `sub_category` VARCHAR(50) NULL,
    `source` VARCHAR(30) NULL,
    `priority` VARCHAR(10) NOT NULL DEFAULT 'medium',
    `status` VARCHAR(20) NOT NULL DEFAULT 'open',
    `pic_id` INTEGER NULL,
    `assigned_to` INTEGER NULL,
    `sales_id` INTEGER NULL,
    `area` VARCHAR(100) NULL,
    `sla_target` DATETIME(3) NULL,
    `resolved_at` DATETIME(3) NULL,
    `closed_at` DATETIME(3) NULL,
    `resolution` TEXT NULL,
    `progress` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `trouble_tickets_ticket_number_key`(`ticket_number`),
    INDEX `trouble_tickets_customer_id_idx`(`customer_id`),
    INDEX `trouble_tickets_status_idx`(`status`),
    INDEX `trouble_tickets_priority_idx`(`priority`),
    INDEX `trouble_tickets_assigned_to_idx`(`assigned_to`),
    INDEX `trouble_tickets_sla_target_idx`(`sla_target`),
    INDEX `trouble_tickets_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket_notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticket_id` INTEGER NOT NULL,
    `type` VARCHAR(20) NOT NULL DEFAULT 'note',
    `content` TEXT NOT NULL,
    `file_url` VARCHAR(255) NULL,
    `created_by` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ticket_notes_ticket_id_idx`(`ticket_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inv_number` VARCHAR(30) NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `quotation_id` INTEGER NULL,
    `sales_id` INTEGER NOT NULL,
    `type` VARCHAR(30) NOT NULL DEFAULT 'penagihan',
    `period_start` DATETIME(3) NULL,
    `period_end` DATETIME(3) NULL,
    `invoice_date` DATETIME(3) NOT NULL,
    `due_date` DATETIME(3) NOT NULL,
    `subtotal` DECIMAL(15, 2) NOT NULL,
    `discount` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `tax_rate` DECIMAL(5, 4) NOT NULL DEFAULT 0.11,
    `tax` DECIMAL(15, 2) NOT NULL,
    `total` DECIMAL(15, 2) NOT NULL,
    `paid_amount` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `remaining` DECIMAL(15, 2) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'draft',
    `notes` TEXT NULL,
    `pdf_url` VARCHAR(255) NULL,
    `sent_at` DATETIME(3) NULL,
    `paid_at` DATETIME(3) NULL,
    `created_by` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `invoices_inv_number_key`(`inv_number`),
    INDEX `invoices_inv_number_idx`(`inv_number`),
    INDEX `invoices_customer_id_idx`(`customer_id`),
    INDEX `invoices_sales_id_idx`(`sales_id`),
    INDEX `invoices_status_idx`(`status`),
    INDEX `invoices_due_date_idx`(`due_date`),
    INDEX `invoices_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoice_id` INTEGER NOT NULL,
    `product_id` INTEGER NULL,
    `description` VARCHAR(255) NOT NULL,
    `qty` INTEGER NOT NULL,
    `unit` VARCHAR(20) NOT NULL DEFAULT 'unit',
    `unit_price` DECIMAL(15, 2) NOT NULL,
    `total` DECIMAL(15, 2) NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `invoice_items_invoice_id_idx`(`invoice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pay_number` VARCHAR(30) NOT NULL,
    `invoice_id` INTEGER NOT NULL,
    `amount` DECIMAL(15, 2) NOT NULL,
    `method` VARCHAR(50) NOT NULL,
    `bank_name` VARCHAR(50) NULL,
    `account_number` VARCHAR(50) NULL,
    `reference` VARCHAR(100) NULL,
    `notes` TEXT NULL,
    `paid_by` VARCHAR(100) NULL,
    `paid_at` DATETIME(3) NOT NULL,
    `created_by` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `payments_pay_number_key`(`pay_number`),
    INDEX `payments_invoice_id_idx`(`invoice_id`),
    INDEX `payments_paid_at_idx`(`paid_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `type` VARCHAR(30) NOT NULL,
    `priority` VARCHAR(10) NOT NULL DEFAULT 'normal',
    `entity_type` VARCHAR(50) NULL,
    `entity_id` INTEGER NULL,
    `action_url` VARCHAR(255) NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `read_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `notifications_user_id_idx`(`user_id`),
    INDEX `notifications_is_read_idx`(`is_read`),
    INDEX `notifications_type_idx`(`type`),
    INDEX `notifications_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `action` VARCHAR(30) NOT NULL,
    `module` VARCHAR(30) NOT NULL,
    `entity_type` VARCHAR(50) NOT NULL,
    `entity_id` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `old_values` JSON NULL,
    `new_values` JSON NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` VARCHAR(500) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `activity_logs_user_id_idx`(`user_id`),
    INDEX `activity_logs_module_idx`(`module`),
    INDEX `activity_logs_action_idx`(`action`),
    INDEX `activity_logs_entity_type_entity_id_idx`(`entity_type`, `entity_id`),
    INDEX `activity_logs_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales_targets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `target` DECIMAL(15, 2) NOT NULL,
    `achieved` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `notes` TEXT NULL,

    INDEX `sales_targets_user_id_idx`(`user_id`),
    INDEX `sales_targets_year_month_idx`(`year`, `month`),
    UNIQUE INDEX `sales_targets_user_id_month_year_key`(`user_id`, `month`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branches`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `refresh_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_sales_id_fkey` FOREIGN KEY (`sales_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leads` ADD CONSTRAINT `leads_assigned_to_fkey` FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interactions` ADD CONSTRAINT `interactions_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interactions` ADD CONSTRAINT `interactions_lead_id_fkey` FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interactions` ADD CONSTRAINT `interactions_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_services` ADD CONSTRAINT `customer_services_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_services` ADD CONSTRAINT `customer_services_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deals` ADD CONSTRAINT `deals_lead_id_fkey` FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deals` ADD CONSTRAINT `deals_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deals` ADD CONSTRAINT `deals_sales_id_fkey` FOREIGN KEY (`sales_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deal_activities` ADD CONSTRAINT `deal_activities_deal_id_fkey` FOREIGN KEY (`deal_id`) REFERENCES `deals`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotations` ADD CONSTRAINT `quotations_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotations` ADD CONSTRAINT `quotations_lead_id_fkey` FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotations` ADD CONSTRAINT `quotations_deal_id_fkey` FOREIGN KEY (`deal_id`) REFERENCES `deals`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotation_items` ADD CONSTRAINT `quotation_items_quotation_id_fkey` FOREIGN KEY (`quotation_id`) REFERENCES `quotations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotation_items` ADD CONSTRAINT `quotation_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presentation_slides` ADD CONSTRAINT `presentation_slides_presentation_id_fkey` FOREIGN KEY (`presentation_id`) REFERENCES `presentations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `installations` ADD CONSTRAINT `installations_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `installations` ADD CONSTRAINT `installations_technician_id_fkey` FOREIGN KEY (`technician_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `installation_stages` ADD CONSTRAINT `installation_stages_installation_id_fkey` FOREIGN KEY (`installation_id`) REFERENCES `installations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trouble_tickets` ADD CONSTRAINT `trouble_tickets_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trouble_tickets` ADD CONSTRAINT `trouble_tickets_assigned_to_fkey` FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket_notes` ADD CONSTRAINT `ticket_notes_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `trouble_tickets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_quotation_id_fkey` FOREIGN KEY (`quotation_id`) REFERENCES `quotations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice_items` ADD CONSTRAINT `invoice_items_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice_items` ADD CONSTRAINT `invoice_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity_logs` ADD CONSTRAINT `activity_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales_targets` ADD CONSTRAINT `sales_targets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

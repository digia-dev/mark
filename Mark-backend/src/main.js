const express = require('express');
const router = express.Router();

// 1. Infrastructure
const prisma = require('./infrastructure/database/prisma-client');
const PrismaUserRepository = require('./infrastructure/repositories/prisma-user-repository');
const PrismaRefreshTokenRepository = require('./infrastructure/repositories/prisma-refresh-token-repository');
const PrismaActivityLogRepository = require('./infrastructure/repositories/prisma-activity-log-repository');
const JwtService = require('./infrastructure/services/jwt-service');
const BcryptService = require('./infrastructure/services/bcrypt-service');
const PrismaBranchRepository = require('./infrastructure/repositories/prisma-branch-repository');
const PrismaProductRepository = require('./infrastructure/repositories/prisma-product-repository');
const PrismaCustomerRepository = require('./infrastructure/repositories/prisma-customer-repository');
const PrismaLeadRepository = require('./infrastructure/repositories/prisma-lead-repository');
const PrismaDealRepository = require('./infrastructure/repositories/prisma-deal-repository');
const PrismaQuotationRepository = require('./infrastructure/repositories/prisma-quotation-repository');
const PrismaInstallationRepository = require('./infrastructure/repositories/prisma-installation-repository');
const PrismaTroubleTicketRepository = require('./infrastructure/repositories/prisma-trouble-ticket-repository');
const PrismaInvoiceRepository = require('./infrastructure/repositories/prisma-invoice-repository');
const PrismaPaymentRepository = require('./infrastructure/repositories/prisma-payment-repository');
const PrismaPresentationRepository = require('./infrastructure/repositories/prisma-presentation-repository');

// 2. Use Cases (Auth)
const LoginUseCase = require('./use-cases/auth/login-use-case');
const LogoutUseCase = require('./use-cases/auth/logout-use-case');
const RefreshTokenUseCase = require('./use-cases/auth/refresh-token-use-case');
const GetProfileUseCase = require('./use-cases/auth/get-profile-use-case');
const RegisterUseCase = require('./use-cases/auth/register-use-case');

// 2. Use Cases (User)
const CreateUserUseCase = require('./use-cases/user/create-user-use-case');
const UpdateUserUseCase = require('./use-cases/user/update-user-use-case');
const GetUserListUseCase = require('./use-cases/user/get-user-list-use-case');
const GetUserDetailUseCase = require('./use-cases/user/get-user-detail-use-case');
const DeleteUserUseCase = require('./use-cases/user/delete-user-use-case');
const ChangePasswordUseCase = require('./use-cases/user/change-password-use-case');

// 2. Use Cases (Branch)
const CreateBranchUseCase = require('./use-cases/branch/create-branch-use-case');
const UpdateBranchUseCase = require('./use-cases/branch/update-branch-use-case');
const GetBranchListUseCase = require('./use-cases/branch/get-branch-list-use-case');
const DeleteBranchUseCase = require('./use-cases/branch/delete-branch-use-case');

// 2. Use Cases (Product)
const CreateProductUseCase = require('./use-cases/product/create-product-use-case');
const UpdateProductUseCase = require('./use-cases/product/update-product-use-case');
const GetProductListUseCase = require('./use-cases/product/get-product-list-use-case');
const GetProductDetailUseCase = require('./use-cases/product/get-product-detail-use-case');
const DeleteProductUseCase = require('./use-cases/product/delete-product-use-case');
const ToggleProductStatusUseCase = require('./use-cases/product/toggle-product-status-use-case');

// 2. Use Cases (Report/Dashboard)
const GetDashboardStatsUseCase = require('./use-cases/report/get-dashboard-stats-use-case');

// 2. Use Cases (CRM)
const CreateCustomerUseCase = require('./use-cases/crm/create-customer-use-case');
const GetCustomerListUseCase = require('./use-cases/crm/get-customer-list-use-case');
const GetCustomerDetailUseCase = require('./use-cases/crm/get-customer-detail-use-case');
const UpdateCustomerUseCase = require('./use-cases/crm/update-customer-use-case');

// 2. Use Cases (CRM - Leads)
const CreateLeadUseCase = require('./use-cases/crm/create-lead-use-case');
const GetLeadListUseCase = require('./use-cases/crm/get-lead-list-use-case');
const GetLeadDetailUseCase = require('./use-cases/crm/get-lead-detail-use-case');
const UpdateLeadUseCase = require('./use-cases/crm/update-lead-use-case');
const UpdateLeadStatusUseCase = require('./use-cases/crm/update-lead-status-use-case');
const DeleteLeadUseCase = require('./use-cases/crm/delete-lead-use-case');
const AssignLeadUseCase = require('./use-cases/crm/assign-lead-use-case');
const ConvertLeadToCustomerUseCase = require('./use-cases/crm/convert-lead-to-customer-use-case');
const ImportLeadsUseCase = require('./use-cases/crm/import-leads-use-case');
const ExportLeadsUseCase = require('./use-cases/crm/export-leads-use-case');

// 2. Use Cases (Pipeline)
const GetDealKanbanUseCase = require('./use-cases/pipeline/get-deal-kanban-use-case');
const GetDealListUseCase = require('./use-cases/pipeline/get-deal-list-use-case');
const GetDealDetailUseCase = require('./use-cases/pipeline/get-deal-detail-use-case');
const CreateDealUseCase = require('./use-cases/pipeline/create-deal-use-case');
const UpdateDealUseCase = require('./use-cases/pipeline/update-deal-use-case');
const DeleteDealUseCase = require('./use-cases/pipeline/delete-deal-use-case');
const MoveDealStageUseCase = require('./use-cases/pipeline/move-deal-stage-use-case');
const UpdateDealProbabilityUseCase = require('./use-cases/pipeline/update-deal-probability-use-case');
const DuplicateDealUseCase = require('./use-cases/pipeline/duplicate-deal-use-case');
const MarkDealWonUseCase = require('./use-cases/pipeline/mark-deal-won-use-case');
const MarkDealLostUseCase = require('./use-cases/pipeline/mark-deal-lost-use-case');
const GetPipelineSummaryUseCase = require('./use-cases/pipeline/get-pipeline-summary-use-case');
const CreateQuotationUseCase = require('./use-cases/quotation/create-quotation-use-case');
const GetQuotationListUseCase = require('./use-cases/quotation/get-quotation-list-use-case');
const GetQuotationDetailUseCase = require('./use-cases/quotation/get-quotation-detail-use-case');
const UpdateQuotationStatusUseCase = require('./use-cases/quotation/update-quotation-status-use-case');
const UpdateQuotationUseCase = require('./use-cases/quotation/update-quotation-use-case');
const DeleteQuotationUseCase = require('./use-cases/quotation/delete-quotation-use-case');
const SendQuotationUseCase = require('./use-cases/quotation/send-quotation-use-case');
const DuplicateQuotationUseCase = require('./use-cases/quotation/duplicate-quotation-use-case');
const GeneratePdfUseCase = require('./use-cases/quotation/generate-pdf-use-case');
const ConvertToInvoiceUseCase = require('./use-cases/quotation/convert-to-invoice-use-case');
const CreateInstallationUseCase = require('./use-cases/installation/create-installation-use-case');
const GetInstallationListUseCase = require('./use-cases/installation/get-installation-list-use-case');
const GetInstallationDetailUseCase = require('./use-cases/installation/get-installation-detail-use-case');
const UpdateInstallationUseCase = require('./use-cases/installation/update-installation-use-case');
const UpdateInstallationStageUseCase = require('./use-cases/installation/update-installation-stage-use-case');
const AssignTechnicianUseCase = require('./use-cases/installation/assign-technician-use-case');
const GetInstallationGanttUseCase = require('./use-cases/installation/get-installation-gantt-use-case');
const GetInstallationStatsUseCase = require('./use-cases/installation/get-installation-stats-use-case');
const CreateTicketUseCase = require('./use-cases/trouble-ticket/create-ticket-use-case');
const GetTicketListUseCase = require('./use-cases/trouble-ticket/get-ticket-list-use-case');
const GetTicketDetailUseCase = require('./use-cases/trouble-ticket/get-ticket-detail-use-case');
const UpdateTicketUseCase = require('./use-cases/trouble-ticket/update-ticket-use-case');
const UpdateTicketStatusUseCase = require('./use-cases/trouble-ticket/update-ticket-status-use-case');
const AssignTicketUseCase = require('./use-cases/trouble-ticket/assign-ticket-use-case');
const AddTicketNoteUseCase = require('./use-cases/trouble-ticket/add-ticket-note-use-case');
const GetTicketStatsUseCase = require('./use-cases/trouble-ticket/get-ticket-stats-use-case');
const CreateInvoiceUseCase = require('./use-cases/invoice/create-invoice-use-case');
const GetInvoiceListUseCase = require('./use-cases/invoice/get-invoice-list-use-case');
const GetInvoiceDetailUseCase = require('./use-cases/invoice/get-invoice-detail-use-case');
const UpdateInvoiceUseCase = require('./use-cases/invoice/update-invoice-use-case');
const DeleteInvoiceUseCase = require('./use-cases/invoice/delete-invoice-use-case');
const RecordPaymentUseCase = require('./use-cases/invoice/record-payment-use-case');
const SendInvoiceUseCase = require('./use-cases/invoice/send-invoice-use-case');
const GenerateInvoicePdfUseCase = require('./use-cases/invoice/generate-pdf-use-case');
const GetInvoiceStatsUseCase = require('./use-cases/invoice/get-invoice-stats-use-case');
const CreatePresentationUseCase = require('./use-cases/presentation/create-presentation-use-case');
const GetPresentationListUseCase = require('./use-cases/presentation/get-presentation-list-use-case');

// 2. Use Cases (Search)
const GlobalSearchUseCase = require('./use-cases/search/global-search-use-case');

// 3. Middlewares
const createAuthMiddleware = require('./interfaces/middlewares/auth-middleware');
const activityLogger = require('./interfaces/middlewares/activity-logger');

// 4. Controllers
const AuthController = require('./interfaces/controllers/auth-controller');
const UserController = require('./interfaces/controllers/user-controller');
const SearchController = require('./interfaces/controllers/search-controller');
const BranchController = require('./interfaces/controllers/branch-controller');
const ProductController = require('./interfaces/controllers/product-controller');
const ReportController = require('./interfaces/controllers/report-controller');
const CustomerController = require('./interfaces/controllers/customer-controller');
const LeadController = require('./interfaces/controllers/lead-controller');
const DealController = require('./interfaces/controllers/deal-controller');
const QuotationController = require('./interfaces/controllers/quotation-controller');
const InstallationController = require('./interfaces/controllers/installation-controller');
const TroubleTicketController = require('./interfaces/controllers/trouble-ticket-controller');
const InvoiceController = require('./interfaces/controllers/invoice-controller');
const PresentationController = require('./interfaces/controllers/presentation-controller');

// 5. Routes
const createAuthRoutes = require('./interfaces/routes/auth-routes');
const createUserRoutes = require('./interfaces/routes/user-routes');
const createSearchRoutes = require('./interfaces/routes/search-routes');
const createBranchRoutes = require('./interfaces/routes/branch-routes');
const createProductRoutes = require('./interfaces/routes/product-routes');
const createReportRoutes = require('./interfaces/routes/report-routes');
const createCustomerRoutes = require('./interfaces/routes/customer-routes');
const createLeadRoutes = require('./interfaces/routes/lead-routes');
const createDealRoutes = require('./interfaces/routes/deal-routes');
const createQuotationRoutes = require('./interfaces/routes/quotation-routes');
const createInstallationRoutes = require('./interfaces/routes/installation-routes');
const createTroubleTicketRoutes = require('./interfaces/routes/trouble-ticket-routes');
const createInvoiceRoutes = require('./interfaces/routes/invoice-routes');
const createPresentationRoutes = require('./interfaces/routes/presentation-routes');

// Services
const LoggerService = require('./infrastructure/services/logger-service');
const NotificationService = require('./infrastructure/services/notification-service');
const PdfService = require('./infrastructure/services/pdf-service');
const MailService = require('./infrastructure/services/mail-service');

// --- Repositories & Services (Shared) ---
const userRepository = new PrismaUserRepository(prisma);
const refreshTokenRepository = new PrismaRefreshTokenRepository(prisma);
const activityLogRepository = new PrismaActivityLogRepository(prisma);
const branchRepository = new PrismaBranchRepository(prisma);
const productRepository = new PrismaProductRepository(prisma);
const customerRepository = new PrismaCustomerRepository(prisma);
const leadRepository = new PrismaLeadRepository(prisma);
const dealRepository = new PrismaDealRepository(prisma);
const quotationRepository = new PrismaQuotationRepository(prisma);
const installationRepository = new PrismaInstallationRepository(prisma);
const troubleTicketRepository = new PrismaTroubleTicketRepository(prisma);
const invoiceRepository = new PrismaInvoiceRepository(prisma);
const paymentRepository = new PrismaPaymentRepository(prisma);
const presentationRepository = new PrismaPresentationRepository(prisma);

const loggerService = new LoggerService(prisma);
const notificationService = new NotificationService(prisma);
const pdfService = new PdfService();
const mailService = new MailService();

const jwtService = new JwtService();
const bcryptService = new BcryptService();

const authMiddleware = createAuthMiddleware(jwtService);

// --- Auth Module ---
const loginUseCase = new LoginUseCase({ userRepository, refreshTokenRepository, jwtService, bcryptService });
const logoutUseCase = new LogoutUseCase({ refreshTokenRepository });
const refreshTokenUseCase = new RefreshTokenUseCase({ refreshTokenRepository, userRepository, jwtService });
const getProfileUseCase = new GetProfileUseCase({ userRepository });
const registerUseCase = new RegisterUseCase({ userRepository, bcryptService });

const authController = new AuthController({
  loginUseCase,
  logoutUseCase,
  refreshTokenUseCase,
  getProfileUseCase,
  registerUseCase
});

// --- User Module ---
const createUserUseCase = new CreateUserUseCase({ userRepository, bcryptService });
const updateUserUseCase = new UpdateUserUseCase({ userRepository });
const getUserListUseCase = new GetUserListUseCase({ userRepository });
const getUserDetailUseCase = new GetUserDetailUseCase({ userRepository });
const deleteUserUseCase = new DeleteUserUseCase({ userRepository });
const changePasswordUseCase = new ChangePasswordUseCase({ userRepository, bcryptService });

const userController = new UserController({
  createUserUseCase,
  updateUserUseCase,
  getUserListUseCase,
  getUserDetailUseCase,
  deleteUserUseCase,
  changePasswordUseCase
});

// --- Branch Module ---
const createBranchUseCase = new CreateBranchUseCase({ branchRepository });
const updateBranchUseCase = new UpdateBranchUseCase({ branchRepository });
const getBranchListUseCase = new GetBranchListUseCase({ branchRepository });
const deleteBranchUseCase = new DeleteBranchUseCase({ branchRepository });

const branchController = new BranchController({
  createBranchUseCase,
  updateBranchUseCase,
  getBranchListUseCase,
  deleteBranchUseCase
});

// --- Product Module ---
const createProductUseCase = new CreateProductUseCase({ productRepository });
const updateProductUseCase = new UpdateProductUseCase({ productRepository });
const getProductListUseCase = new GetProductListUseCase({ productRepository });
const getProductDetailUseCase = new GetProductDetailUseCase({ productRepository });
const deleteProductUseCase = new DeleteProductUseCase({ productRepository });
const toggleProductStatusUseCase = new ToggleProductStatusUseCase({ productRepository });

const productController = new ProductController({
  createProductUseCase,
  updateProductUseCase,
  getProductListUseCase,
  getProductDetailUseCase,
  deleteProductUseCase,
  toggleProductStatusUseCase
});

// --- Report Module ---
const getDashboardStatsUseCase = new GetDashboardStatsUseCase(prisma);
const reportController = new ReportController({ getDashboardStatsUseCase });

// --- Customer Module ---
const AddInteractionUseCase = require('./use-cases/crm/add-interaction-use-case');
const GetCustomerStatsUseCase = require('./use-cases/crm/get-customer-stats-use-case');
const ImportCustomersUseCase = require('./use-cases/crm/import-customers-use-case');
const ExportCustomersUseCase = require('./use-cases/crm/export-customers-use-case');
const DeleteCustomerUseCase = require('./use-cases/crm/delete-customer-use-case');
const GetCustomerInteractionsUseCase = require('./use-cases/crm/get-customer-interactions-use-case');
const GetCustomerServicesUseCase = require('./use-cases/crm/get-customer-services-use-case');
const GetCustomerInvoicesUseCase = require('./use-cases/crm/get-customer-invoices-use-case');
const GetCustomerTicketsUseCase = require('./use-cases/crm/get-customer-tickets-use-case');

const createCustomerUseCase = new CreateCustomerUseCase({ customerRepository });
const getCustomerListUseCase = new GetCustomerListUseCase({ customerRepository });
const getCustomerDetailUseCase = new GetCustomerDetailUseCase({ customerRepository });
const updateCustomerUseCase = new UpdateCustomerUseCase({ customerRepository });
const addInteractionUseCase = new AddInteractionUseCase(prisma);
const getCustomerStatsUseCase = new GetCustomerStatsUseCase(prisma);
const importCustomersUseCase = new ImportCustomersUseCase(prisma);
const exportCustomersUseCase = new ExportCustomersUseCase(prisma);
const deleteCustomerUseCase = new DeleteCustomerUseCase(prisma);
const getCustomerInteractionsUseCase = new GetCustomerInteractionsUseCase(prisma);
const getCustomerServicesUseCase = new GetCustomerServicesUseCase(prisma);
const getCustomerInvoicesUseCase = new GetCustomerInvoicesUseCase(prisma);
const getCustomerTicketsUseCase = new GetCustomerTicketsUseCase(prisma);

const customerController = new CustomerController({
  createCustomerUseCase,
  getCustomerListUseCase,
  getCustomerDetailUseCase,
  updateCustomerUseCase,
  addInteractionUseCase,
  getCustomerStatsUseCase,
  importCustomersUseCase,
  exportCustomersUseCase,
  deleteCustomerUseCase,
  getCustomerInteractionsUseCase,
  getCustomerServicesUseCase,
  getCustomerInvoicesUseCase,
  getCustomerTicketsUseCase
});

// --- Lead Module ---
const createLeadUseCase = new CreateLeadUseCase({ leadRepository, loggerService });
const getLeadListUseCase = new GetLeadListUseCase({ leadRepository });
const getLeadDetailUseCase = new GetLeadDetailUseCase({ leadRepository });
const updateLeadUseCase = new UpdateLeadUseCase({ leadRepository });
const updateLeadStatusUseCase = new UpdateLeadStatusUseCase({ leadRepository, loggerService, notificationService });
const deleteLeadUseCase = new DeleteLeadUseCase({ leadRepository });
const assignLeadUseCase = new AssignLeadUseCase({ leadRepository });
const convertLeadToCustomerUseCase = new ConvertLeadToCustomerUseCase({ 
  leadRepository, 
  customerRepository, 
  createCustomerUseCase 
});
const importLeadsUseCase = new ImportLeadsUseCase({ leadRepository });
const exportLeadsUseCase = new ExportLeadsUseCase(prisma);

const leadController = new LeadController({
  createLeadUseCase,
  getLeadListUseCase,
  getLeadDetailUseCase,
  updateLeadUseCase,
  updateLeadStatusUseCase,
  deleteLeadUseCase,
  assignLeadUseCase,
  convertLeadToCustomerUseCase,
  importLeadsUseCase,
  exportLeadsUseCase
});

// --- Pipeline Module ---
const getDealKanbanUseCase = new GetDealKanbanUseCase({ dealRepository });
const getDealListUseCase = new GetDealListUseCase({ dealRepository });
const getDealDetailUseCase = new GetDealDetailUseCase({ dealRepository });
const createDealUseCase = new CreateDealUseCase({ dealRepository });
const updateDealUseCase = new UpdateDealUseCase({ dealRepository });
const deleteDealUseCase = new DeleteDealUseCase({ dealRepository });
const moveDealStageUseCase = new MoveDealStageUseCase({ dealRepository });
const updateDealProbabilityUseCase = new UpdateDealProbabilityUseCase({ dealRepository });
const duplicateDealUseCase = new DuplicateDealUseCase({ dealRepository });
const markDealWonUseCase = new MarkDealWonUseCase({ dealRepository });
const markDealLostUseCase = new MarkDealLostUseCase({ dealRepository });
const getPipelineSummaryUseCase = new GetPipelineSummaryUseCase(prisma);

const dealController = new DealController({
  getDealKanbanUseCase,
  getDealListUseCase,
  getDealDetailUseCase,
  createDealUseCase,
  updateDealUseCase,
  deleteDealUseCase,
  moveDealStageUseCase,
  updateDealProbabilityUseCase,
  duplicateDealUseCase,
  markDealWonUseCase,
  markDealLostUseCase,
  getPipelineSummaryUseCase
});

// --- Quotation Module ---
const createQuotationUseCase = new CreateQuotationUseCase({ quotationRepository });
const getQuotationListUseCase = new GetQuotationListUseCase({ quotationRepository });
const getQuotationDetailUseCase = new GetQuotationDetailUseCase({ quotationRepository });
const updateQuotationUseCase = new UpdateQuotationUseCase({ quotationRepository });
const deleteQuotationUseCase = new DeleteQuotationUseCase({ quotationRepository });
const sendQuotationUseCase = new SendQuotationUseCase({ quotationRepository, pdfService, mailService });
const updateQuotationStatusUseCase = new UpdateQuotationStatusUseCase({ quotationRepository });
const duplicateQuotationUseCase = new DuplicateQuotationUseCase({ quotationRepository });
const generatePdfUseCase = new GeneratePdfUseCase({ quotationRepository, pdfService });
const convertToInvoiceUseCase = new ConvertToInvoiceUseCase({ 
  quotationRepository, 
  createInvoiceUseCase: new CreateInvoiceUseCase({ invoiceRepository })
});

const quotationController = new QuotationController({
  createQuotationUseCase,
  getQuotationListUseCase,
  getQuotationDetailUseCase,
  updateQuotationUseCase,
  deleteQuotationUseCase,
  sendQuotationUseCase,
  updateQuotationStatusUseCase,
  duplicateQuotationUseCase,
  generatePdfUseCase,
  convertToInvoiceUseCase
});

// --- Timeline (Installation) Module ---
const createInstallationUseCase = new CreateInstallationUseCase({ installationRepository });
const getInstallationListUseCase = new GetInstallationListUseCase({ installationRepository });
const getInstallationDetailUseCase = new GetInstallationDetailUseCase({ installationRepository });
const updateInstallationUseCase = new UpdateInstallationUseCase({ installationRepository });
const updateInstallationStageUseCase = new UpdateInstallationStageUseCase({ installationRepository });
const assignTechnicianUseCase = new AssignTechnicianUseCase({ installationRepository });
const getInstallationGanttUseCase = new GetInstallationGanttUseCase({ installationRepository });
const getInstallationStatsUseCase = new GetInstallationStatsUseCase({ installationRepository });

const installationController = new InstallationController({
  createInstallationUseCase,
  getInstallationListUseCase,
  getInstallationDetailUseCase,
  updateInstallationUseCase,
  updateInstallationStageUseCase,
  assignTechnicianUseCase,
  getInstallationGanttUseCase,
  getInstallationStatsUseCase
});

// --- Trouble Ticket Module ---
const createTicketUseCase = new CreateTicketUseCase({ troubleTicketRepository });
const getTicketListUseCase = new GetTicketListUseCase({ troubleTicketRepository });
const getTicketDetailUseCase = new GetTicketDetailUseCase({ troubleTicketRepository });
const updateTicketUseCase = new UpdateTicketUseCase({ troubleTicketRepository });
const updateTicketStatusUseCase = new UpdateTicketStatusUseCase({ troubleTicketRepository });
const assignTicketUseCase = new AssignTicketUseCase({ troubleTicketRepository });
const addTicketNoteUseCase = new AddTicketNoteUseCase({ troubleTicketRepository });
const getTicketStatsUseCase = new GetTicketStatsUseCase({ troubleTicketRepository });

const troubleTicketController = new TroubleTicketController({
  createTicketUseCase,
  getTicketListUseCase,
  getTicketDetailUseCase,
  updateTicketUseCase,
  updateTicketStatusUseCase,
  assignTicketUseCase,
  addTicketNoteUseCase,
  getTicketStatsUseCase
});

// --- Invoice & Payment Module ---
const createInvoiceUseCase = new CreateInvoiceUseCase({ invoiceRepository });
const getInvoiceListUseCase = new GetInvoiceListUseCase({ invoiceRepository });
const getInvoiceDetailUseCase = new GetInvoiceDetailUseCase({ invoiceRepository });
const updateInvoiceUseCase = new UpdateInvoiceUseCase({ invoiceRepository });
const deleteInvoiceUseCase = new DeleteInvoiceUseCase({ invoiceRepository });
const recordPaymentUseCase = new RecordPaymentUseCase({ invoiceRepository, paymentRepository });
const sendInvoiceUseCase = new SendInvoiceUseCase({ invoiceRepository, mailService, notificationService });
const generateInvoicePdfUseCase = new GenerateInvoicePdfUseCase({ invoiceRepository, pdfService });
const getInvoiceStatsUseCase = new GetInvoiceStatsUseCase({ invoiceRepository });

const invoiceController = new InvoiceController({
  createInvoiceUseCase,
  getInvoiceListUseCase,
  getInvoiceDetailUseCase,
  updateInvoiceUseCase,
  deleteInvoiceUseCase,
  recordPaymentUseCase,
  sendInvoiceUseCase,
  generatePdfUseCase: generateInvoicePdfUseCase,
  getInvoiceStatsUseCase
});

// --- Presentation Module ---
const createPresentationUseCase = new CreatePresentationUseCase({ presentationRepository });
const getPresentationListUseCase = new GetPresentationListUseCase({ presentationRepository });

const presentationController = new PresentationController({
  createPresentationUseCase,
  getPresentationListUseCase
});

// --- Search Module ---
const globalSearchUseCase = new GlobalSearchUseCase(prisma);
const searchController = new SearchController(globalSearchUseCase);

// --- Target Module ---
const CreateSalesTargetUseCase = require('./use-cases/target/create-sales-target-use-case');
const GetSalesTargetUseCase = require('./use-cases/target/get-sales-target-use-case');
const TargetController = require('./interfaces/controllers/target-controller');
const createTargetRoutes = require('./interfaces/routes/target-routes');

const createSalesTargetUseCase = new CreateSalesTargetUseCase(prisma);
const getSalesTargetUseCase = new GetSalesTargetUseCase(prisma);
const targetController = new TargetController({ createSalesTargetUseCase, getSalesTargetUseCase });

// --- Mount Routes ---
router.use('/auth', createAuthRoutes({ authController, authMiddleware }));
router.use('/users', createUserRoutes({ userController, authMiddleware, activityLogRepository }));
router.use('/search', createSearchRoutes(searchController));
router.use('/targets', createTargetRoutes({ targetController, authMiddleware }));
router.use('/branches', createBranchRoutes({ branchController, authMiddleware, activityLogger }));
router.use('/products', createProductRoutes({ productController, authMiddleware, activityLogger }));
router.use('/reports', createReportRoutes({ reportController, authMiddleware }));
router.use('/customers', createCustomerRoutes({ customerController, authMiddleware, activityLogger }));
router.use('/leads', createLeadRoutes({ leadController, authMiddleware }));
router.use('/deals', createDealRoutes({ dealController, authMiddleware }));
router.use('/quotations', createQuotationRoutes({ quotationController, authMiddleware }));
router.use('/installations', createInstallationRoutes({ installationController, authMiddleware }));
router.use('/trouble-tickets', createTroubleTicketRoutes({ troubleTicketController, authMiddleware }));
router.use('/invoices', createInvoiceRoutes({ invoiceController, authMiddleware }));
router.use('/presentations', createPresentationRoutes({ presentationController, authMiddleware }));

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;

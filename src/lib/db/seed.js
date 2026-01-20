"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
var _1 = require(".");
var placeholder_images_1 = require("../placeholder-images");
var initialProjects = [
    {
        title: 'Inventory Management',
        description: 'Real-time supply chain tracking with M-Pesa API integration for SMEs.',
        keyFeatures: ['Real-time Tracking', 'M-Pesa API', 'Automated Reordering'],
        imageUrl: placeholder_images_1.placeholderImages.inventory.imageUrl,
        imageHint: placeholder_images_1.placeholderImages.inventory.imageHint,
        gridSpan: 'col-span-1 md:col-span-1',
        icon: 'Boxes',
    },
    {
        title: 'Graphic Design Workbench',
        description: 'Collaborative canvas for African creatives to build and share their work.',
        keyFeatures: ['Collaborative Canvas', 'Vector Tools', 'Asset Library'],
        imageUrl: placeholder_images_1.placeholderImages.design.imageUrl,
        imageHint: placeholder_images_1.placeholderImages.design.imageHint,
        gridSpan: 'col-span-1 sm:col-span-2 lg:col-span-2',
        icon: 'PenTool',
    },
    {
        title: 'Financial Management Tool',
        description: 'Multi-currency (KES/USD) cash flow forecasting for African startups.',
        keyFeatures: ['KES/USD Support', 'Cash Flow Forecasting', 'Investor Reports'],
        imageUrl: placeholder_images_1.placeholderImages.finance.imageUrl,
        imageHint: placeholder_images_1.placeholderImages.finance.imageHint,
        gridSpan: 'col-span-1 sm:col-span-2 lg:col-span-2',
        icon: 'LineChart',
    },
    {
        title: 'LMS',
        description: 'Offline-first video modules for remote learning in low-bandwidth areas.',
        keyFeatures: ['Offline-First', 'Video Modules', 'Progress Syncing'],
        imageUrl: placeholder_images_1.placeholderImages.lms.imageUrl,
        imageHint: placeholder_images_1.placeholderImages.lms.imageHint,
        gridSpan: 'col-span-1 md:col-span-1',
        icon: 'BookOpen',
    },
    {
        title: 'Enterprise Web Platform',
        description: 'Scalable web platform with a fully integrated CRM system.',
        keyFeatures: ['Integrated CRM', 'Microservices', 'High Availability'],
        imageUrl: placeholder_images_1.placeholderImages.enterpriseA.imageUrl,
        imageHint: placeholder_images_1.placeholderImages.enterpriseA.imageHint,
        gridSpan: 'col-span-1 md:col-span-1',
        icon: 'Server',
    },
    {
        title: 'Enterprise Web Platform',
        description: 'Secure, compliant enterprise solution with advanced CRM capabilities.',
        keyFeatures: ['Advanced CRM', 'API Gateway'],
        imageUrl: placeholder_images_1.placeholderImages.enterpriseB.imageUrl,
        imageHint: placeholder_images_1.placeholderImages.enterpriseB.imageHint,
        gridSpan: 'col-span-1 sm:col-span-2 lg:col-span-2',
        icon: 'Globe',
    },
];
var initialTestimonials = [
    {
        quote: "Working with Nairobi Tech Creative was a game-changer. Their insights into the African market and their technical execution are second to none.",
        author: "Jane Doe",
        title: "CEO, AgriConnect",
        avatarUrl: placeholder_images_1.placeholderImages.testimonial1.imageUrl,
        avatarHint: placeholder_images_1.placeholderImages.testimonial1.imageHint,
    },
    {
        quote: "The team's dedication to building scalable, offline-first solutions helped us reach communities we never thought possible. Truly innovative.",
        author: "John Smith",
        title: "Founder, EduScale",
        avatarUrl: placeholder_images_1.placeholderImages.testimonial2.imageUrl,
        avatarHint: placeholder_images_1.placeholderImages.testimonial2.imageHint,
    },
    {
        quote: "Their financial forecasting tool, with its multi-currency support, was essential for our seed round. They understand the startup journey in Africa.",
        author: "Amina Okoro",
        title: "CFO, FinTech Innovators",
        avatarUrl: placeholder_images_1.placeholderImages.testimonial3.imageUrl,
        avatarHint: placeholder_images_1.placeholderImages.testimonial3.imageHint,
    },
    {
        quote: "The collaborative design platform they built for us has become the central hub for our creative community. The user experience is flawless.",
        author: "Kwame Annan",
        title: "Director, Creative Guild Africa",
        avatarUrl: placeholder_images_1.placeholderImages.testimonial4.imageUrl,
        avatarHint: placeholder_images_1.placeholderImages.testimonial4.imageHint,
    },
];
var initialPosts = [
    {
        slug: 'the-rise-of-mobile-first-solutions-in-africa',
        title: 'The Rise of Mobile-First Solutions in Africa',
        description: 'Exploring how mobile technology is shaping the future of business and daily life across the continent.',
        content: "Africa is not just a mobile-first continent; it's a mobile-only continent for a vast majority of its population. This paradigm shift has led to an explosion of innovation, with developers and entrepreneurs creating solutions tailored specifically for mobile users. From fintech to healthcare, mobile technology is leapfrogging traditional infrastructure, providing access to essential services for millions.\n\nIn this post, we'll explore the key drivers behind this trend, including the proliferation of affordable smartphones, expanding mobile network coverage, and the youthful, tech-savvy demographics of the continent. We'll also showcase some of the most exciting mobile-first companies that are making a global impact from their African headquarters. The future is mobile, and Africa is leading the charge.",
        imageUrl: placeholder_images_1.placeholderImages.blog1.imageUrl,
        imageHint: placeholder_images_1.placeholderImages.blog1.imageHint,
        author: 'Jalen Doe',
        authorAvatarUrl: placeholder_images_1.placeholderImages.testimonial1.imageUrl,
        authorAvatarHint: placeholder_images_1.placeholderImages.testimonial1.imageHint,
        likes: 128,
        comments: '',
    },
    {
        slug: 'fintech-innovation-beyond-mobile-money',
        title: 'FinTech Innovation: Beyond Mobile Money',
        description: 'A deep dive into the next wave of financial technology emerging from African tech hubs.',
        content: "While mobile money platforms like M-Pesa revolutionized financial inclusion in Africa, the story doesn't end there. A new wave of fintech innovation is building on this foundation, offering more complex financial products to a rapidly growing consumer base. We're seeing the rise of digital-only banks, micro-investment platforms, and AI-powered credit scoring systems that are democratizing access to wealth creation tools.\n\nThese new services are tackling everything from cross-border payments to personal financial management, all through a mobile-centric lens. The regulatory landscape is evolving to keep pace, creating a dynamic and sometimes challenging environment for innovators. This article examines the startups leading the charge and the potential for these African-born solutions to be adapted for global markets.",
        imageUrl: placeholder_images_1.placeholderImages.blog2.imageUrl,
        imageHint: placeholder_images_1.placeholderImages.blog2.imageHint,
        author: 'Maria Garcia',
        authorAvatarUrl: placeholder_images_1.placeholderImages.testimonial3.imageUrl,
        authorAvatarHint: placeholder_images_1.placeholderImages.testimonial3.imageHint,
        likes: 95,
        comments: '',
    },
    {
        slug: 'designing-for-accessibility-in-a-diverse-market',
        title: 'Designing for Accessibility in a Diverse Market',
        description: 'Key principles and practical tips for creating inclusive digital products for all users.',
        content: "Designing for the African continent means designing for an incredible diversity of languages, cultures, and levels of digital literacy. It also means accounting for varying device capabilities and network conditions. True accessibility goes beyond screen readers and alt text; it's about creating products that are intuitive, resilient, and respectful of the user's context.\n\nThis post outlines a framework for inclusive design that we follow at The Nairobi Tech Creative. We'll cover topics like offline-first architecture, performance optimization for low-end devices, localization best practices, and the importance of user research with diverse community groups. By prioritizing accessibility from day one, we can build products that truly serve everyone.",
        imageUrl: placeholder_images_1.placeholderImages.blog3.imageUrl,
        imageHint: placeholder_images_1.placeholderImages.blog3.imageHint,
        author: 'David Kim',
        authorAvatarUrl: placeholder_images_1.placeholderImages.testimonial2.imageUrl,
        authorAvatarHint: placeholder_images_1.placeholderImages.testimonial2.imageHint,
        likes: 210,
        comments: '',
    },
];
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, initialProjects_1, project, _a, initialPosts_1, post, _b, initialTestimonials_1, testimonial, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('Start seeding with Prisma...');
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 19, , 20]);
                    console.log('Clearing existing data...');
                    return [4 /*yield*/, _1.db.post.deleteMany()];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, _1.db.project.deleteMany()];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, _1.db.testimonial.deleteMany()];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, _1.db.settings.deleteMany()];
                case 5:
                    _c.sent();
                    console.log('Data cleared.');
                    _i = 0, initialProjects_1 = initialProjects;
                    _c.label = 6;
                case 6:
                    if (!(_i < initialProjects_1.length)) return [3 /*break*/, 9];
                    project = initialProjects_1[_i];
                    return [4 /*yield*/, _1.db.project.create({
                            data: __assign(__assign({}, project), { keyFeatures: project.keyFeatures.join(',') })
                        })];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9:
                    console.log("Seeded ".concat(initialProjects.length, " projects."));
                    _a = 0, initialPosts_1 = initialPosts;
                    _c.label = 10;
                case 10:
                    if (!(_a < initialPosts_1.length)) return [3 /*break*/, 13];
                    post = initialPosts_1[_a];
                    return [4 /*yield*/, _1.db.post.create({ data: post })];
                case 11:
                    _c.sent();
                    _c.label = 12;
                case 12:
                    _a++;
                    return [3 /*break*/, 10];
                case 13:
                    console.log("Seeded ".concat(initialPosts.length, " posts."));
                    _b = 0, initialTestimonials_1 = initialTestimonials;
                    _c.label = 14;
                case 14:
                    if (!(_b < initialTestimonials_1.length)) return [3 /*break*/, 17];
                    testimonial = initialTestimonials_1[_b];
                    return [4 /*yield*/, _1.db.testimonial.create({ data: testimonial })];
                case 15:
                    _c.sent();
                    _c.label = 16;
                case 16:
                    _b++;
                    return [3 /*break*/, 14];
                case 17:
                    console.log("Seeded ".concat(initialTestimonials.length, " testimonials."));
                    // Seed Settings
                    console.log('Seeding settings...');
                    return [4 /*yield*/, _1.db.settings.createMany({
                            data: [
                                { key: 'heroImage', value: placeholder_images_1.placeholderImages.hero.imageUrl },
                                { key: 'logo', value: null },
                                { key: 'founderImage', value: placeholder_images_1.placeholderImages.founder.imageUrl },
                            ]
                        })];
                case 18:
                    _c.sent();
                    console.log('Seeded initial settings.');
                    return [3 /*break*/, 20];
                case 19:
                    error_1 = _c.sent();
                    console.error('Error during seeding:', error_1);
                    throw new Error('Database seeding failed.');
                case 20: return [2 /*return*/];
            }
        });
    });
}

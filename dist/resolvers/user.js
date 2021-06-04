"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const User_1 = require("./../entities/User");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
let UsernamePasswordIn = class UsernamePasswordIn {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UsernamePasswordIn.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UsernamePasswordIn.prototype, "password", void 0);
UsernamePasswordIn = __decorate([
    type_graphql_1.InputType()
], UsernamePasswordIn);
let FeildError = class FeildError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FeildError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FeildError.prototype, "message", void 0);
FeildError = __decorate([
    type_graphql_1.ObjectType()
], FeildError);
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [FeildError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
let UserResolver = class UserResolver {
    async login(options, { em }) {
        const user = await em.findOne(User_1.User, { username: options.username });
        if (!user) {
            return {
                errors: [{
                        field: "username",
                        message: "User doesn't exsist ",
                    },
                ],
            };
        }
        const valid = await argon2_1.default.verify(user.password, options.password);
        if (!valid) {
            return {
                errors: [{
                        field: "password",
                        message: "Check your password ",
                    },
                ],
            };
        }
        await em.persistAndFlush(user);
        return {
            user,
        };
    }
    async register(options, { em }) {
        if (options.username.length <= 4) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "Lenght must be greated than 4",
                    },
                ],
            };
        }
        if (options.password.length <= 5) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Lenght must be greated than 5",
                    },
                ],
            };
        }
        const hashpass = await argon2_1.default.hash(options.password);
        const user = em.create(User_1.User, {
            username: options.username,
            password: hashpass,
        });
        try {
            await em.persistAndFlush(user);
        }
        catch (err) {
            console.log('message: ', err);
        }
        return {
            user,
        };
    }
};
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsernamePasswordIn, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsernamePasswordIn, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map
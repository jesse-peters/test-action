"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
const lib_1 = require("../lib");
const logging_1 = require("./logging");
async function publish(args) {
    let manifest = lib_1.AssetManifest.fromPath(args.path);
    logging_1.log('verbose', `Loaded manifest from ${args.path}: ${manifest.entries.length} assets found`);
    if (args.assets && args.assets.length > 0) {
        const selection = args.assets.map(a => lib_1.DestinationPattern.parse(a));
        manifest = manifest.select(selection);
        logging_1.log('verbose', `Applied selection: ${manifest.entries.length} assets selected.`);
    }
    const pub = new lib_1.AssetPublishing(manifest, {
        aws: new lib_1.DefaultAwsClient(args.profile),
        progressListener: new ConsoleProgress(),
        throwOnError: false,
    });
    await pub.publish();
    if (pub.hasFailures) {
        for (const failure of pub.failures) {
            // eslint-disable-next-line no-console
            console.error('Failure:', failure.error.stack);
        }
        process.exitCode = 1;
    }
}
exports.publish = publish;
const EVENT_TO_LEVEL = {
    build: 'verbose',
    cached: 'verbose',
    check: 'verbose',
    debug: 'verbose',
    fail: 'error',
    found: 'verbose',
    start: 'info',
    success: 'info',
    upload: 'verbose',
};
class ConsoleProgress {
    onPublishEvent(type, event) {
        logging_1.log(EVENT_TO_LEVEL[type], `[${event.percentComplete}%] ${type}: ${event.message}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0NBR2dCO0FBQ2hCLHVDQUEwQztBQUVuQyxLQUFLLFVBQVUsT0FBTyxDQUFDLElBSTdCO0lBRUMsSUFBSSxRQUFRLEdBQUcsbUJBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELGFBQUcsQ0FBQyxTQUFTLEVBQUUsd0JBQXdCLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLGVBQWUsQ0FBQyxDQUFDO0lBRTdGLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDekMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyx3QkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxhQUFHLENBQUMsU0FBUyxFQUFFLHNCQUFzQixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sbUJBQW1CLENBQUMsQ0FBQztLQUNsRjtJQUVELE1BQU0sR0FBRyxHQUFHLElBQUkscUJBQWUsQ0FBQyxRQUFRLEVBQUU7UUFDeEMsR0FBRyxFQUFFLElBQUksc0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN2QyxnQkFBZ0IsRUFBRSxJQUFJLGVBQWUsRUFBRTtRQUN2QyxZQUFZLEVBQUUsS0FBSztLQUNwQixDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUVwQixJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUU7UUFDbkIsS0FBSyxNQUFNLE9BQU8sSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2xDLHNDQUFzQztZQUN0QyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7S0FDdEI7QUFDSCxDQUFDO0FBL0JELDBCQStCQztBQUVELE1BQU0sY0FBYyxHQUFnQztJQUNsRCxLQUFLLEVBQUUsU0FBUztJQUNoQixNQUFNLEVBQUUsU0FBUztJQUNqQixLQUFLLEVBQUUsU0FBUztJQUNoQixLQUFLLEVBQUUsU0FBUztJQUNoQixJQUFJLEVBQUUsT0FBTztJQUNiLEtBQUssRUFBRSxTQUFTO0lBQ2hCLEtBQUssRUFBRSxNQUFNO0lBQ2IsT0FBTyxFQUFFLE1BQU07SUFDZixNQUFNLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBRUYsTUFBTSxlQUFlO0lBQ1osY0FBYyxDQUFDLElBQWUsRUFBRSxLQUF1QjtRQUM1RCxhQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLGVBQWUsTUFBTSxJQUFJLEtBQUssS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDckYsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQXNzZXRNYW5pZmVzdCwgQXNzZXRQdWJsaXNoaW5nLCBEZWZhdWx0QXdzQ2xpZW50LCBEZXN0aW5hdGlvblBhdHRlcm4sIEV2ZW50VHlwZSxcbiAgSVB1Ymxpc2hQcm9ncmVzcywgSVB1Ymxpc2hQcm9ncmVzc0xpc3RlbmVyLFxufSBmcm9tICcuLi9saWInO1xuaW1wb3J0IHsgbG9nLCBMb2dMZXZlbCB9IGZyb20gJy4vbG9nZ2luZyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwdWJsaXNoKGFyZ3M6IHtcbiAgcGF0aDogc3RyaW5nO1xuICBhc3NldHM/OiBzdHJpbmdbXTtcbiAgcHJvZmlsZT86IHN0cmluZztcbn0pIHtcblxuICBsZXQgbWFuaWZlc3QgPSBBc3NldE1hbmlmZXN0LmZyb21QYXRoKGFyZ3MucGF0aCk7XG4gIGxvZygndmVyYm9zZScsIGBMb2FkZWQgbWFuaWZlc3QgZnJvbSAke2FyZ3MucGF0aH06ICR7bWFuaWZlc3QuZW50cmllcy5sZW5ndGh9IGFzc2V0cyBmb3VuZGApO1xuXG4gIGlmIChhcmdzLmFzc2V0cyAmJiBhcmdzLmFzc2V0cy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gYXJncy5hc3NldHMubWFwKGEgPT4gRGVzdGluYXRpb25QYXR0ZXJuLnBhcnNlKGEpKTtcbiAgICBtYW5pZmVzdCA9IG1hbmlmZXN0LnNlbGVjdChzZWxlY3Rpb24pO1xuICAgIGxvZygndmVyYm9zZScsIGBBcHBsaWVkIHNlbGVjdGlvbjogJHttYW5pZmVzdC5lbnRyaWVzLmxlbmd0aH0gYXNzZXRzIHNlbGVjdGVkLmApO1xuICB9XG5cbiAgY29uc3QgcHViID0gbmV3IEFzc2V0UHVibGlzaGluZyhtYW5pZmVzdCwge1xuICAgIGF3czogbmV3IERlZmF1bHRBd3NDbGllbnQoYXJncy5wcm9maWxlKSxcbiAgICBwcm9ncmVzc0xpc3RlbmVyOiBuZXcgQ29uc29sZVByb2dyZXNzKCksXG4gICAgdGhyb3dPbkVycm9yOiBmYWxzZSxcbiAgfSk7XG5cbiAgYXdhaXQgcHViLnB1Ymxpc2goKTtcblxuICBpZiAocHViLmhhc0ZhaWx1cmVzKSB7XG4gICAgZm9yIChjb25zdCBmYWlsdXJlIG9mIHB1Yi5mYWlsdXJlcykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWx1cmU6JywgZmFpbHVyZS5lcnJvci5zdGFjayk7XG4gICAgfVxuXG4gICAgcHJvY2Vzcy5leGl0Q29kZSA9IDE7XG4gIH1cbn1cblxuY29uc3QgRVZFTlRfVE9fTEVWRUw6IFJlY29yZDxFdmVudFR5cGUsIExvZ0xldmVsPiA9IHtcbiAgYnVpbGQ6ICd2ZXJib3NlJyxcbiAgY2FjaGVkOiAndmVyYm9zZScsXG4gIGNoZWNrOiAndmVyYm9zZScsXG4gIGRlYnVnOiAndmVyYm9zZScsXG4gIGZhaWw6ICdlcnJvcicsXG4gIGZvdW5kOiAndmVyYm9zZScsXG4gIHN0YXJ0OiAnaW5mbycsXG4gIHN1Y2Nlc3M6ICdpbmZvJyxcbiAgdXBsb2FkOiAndmVyYm9zZScsXG59O1xuXG5jbGFzcyBDb25zb2xlUHJvZ3Jlc3MgaW1wbGVtZW50cyBJUHVibGlzaFByb2dyZXNzTGlzdGVuZXIge1xuICBwdWJsaWMgb25QdWJsaXNoRXZlbnQodHlwZTogRXZlbnRUeXBlLCBldmVudDogSVB1Ymxpc2hQcm9ncmVzcyk6IHZvaWQge1xuICAgIGxvZyhFVkVOVF9UT19MRVZFTFt0eXBlXSwgYFske2V2ZW50LnBlcmNlbnRDb21wbGV0ZX0lXSAke3R5cGV9OiAke2V2ZW50Lm1lc3NhZ2V9YCk7XG4gIH1cbn1cbiJdfQ==
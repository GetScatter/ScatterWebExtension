import StorageService from '../../src/services/StorageService';
import chrome from '../helpers/chrome'
import { expect, assert } from 'chai';
import 'mocha';



describe('StorageService', () => {

    global.chrome = chrome;

    let scatter = null;

    it('should be able to get an instance of scatter from the storage even if one does not exist', (done) => {
        StorageService.get().then(stored => {
            scatter = stored;
            done();
        })
    });

    it('should be able to save an instance of scatter to the storage', (done) => {
        scatter.meta.version = '1.2';
        StorageService.save(scatter).then(saved => {
            StorageService.get().then(stored => {
                assert(stored.meta.version === scatter.meta.version, "Saved scatter does not match");
                done();
            })
        })
    });

    it('should be able to remove the instance of scatter from the storage', (done) => {
        StorageService.remove().then(saved => {
            StorageService.get().then(stored => {
                assert(stored.meta.version !== scatter.meta.version, "Saved scatter does not match");
                done();
            })
        })
    });

});
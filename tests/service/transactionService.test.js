// import { expect, describe, it, afterAll } from '@jest/globals';
const db = require('../../app/models');
const TransactionService = require('../../app/services/TransactionService');

describe('Transaction Services', () => {
    const transactionService = new TransactionService({
        transactionModel: db.Transaction,
        articleModel: db.Article,
        userModel: db.User,
    });
    let transactionInstance;

    const testTransactionData = {
        account_number: '124123941',
        account_name: 'agrha',
        bank_name: 'BCA',
        article_id: 11,
        status:'ACTIVE',
        user_id: 45,
    };

    const expectedTransaction = {
        account_name:'agrha',
        account_number:'124123941',
        article_id: 11,
        bank_name: 'BCA',
        user_id:45,
        status:'ACTIVE',
    };
    
    describe('Insert Transaction to database', () => {
        it('Should insert a Transaction to database', async () => {
            transactionInstance = await transactionService.createTransaction(testTransactionData);
            expect(transactionInstance.dataValues).toMatchObject(expectedTransaction);
        });
    });

    describe('Get List Owned Article By Transaction', () => {
        
        it('Should find list transaction', async () => {
            let userId = testTransactionData.user_id
            result = await transactionService.getlistOwnedArticle({userId});
            expect(result[0].dataValues).toMatchObject(expectedTransaction);
        });
    });

    describe('Check Owned Article By Transaction', () => {
        let userId = testTransactionData.user_id
        let articleId = testTransactionData.article_id
        it('Should check if the article is owned', async () => {
        transactionInstance = await transactionService.checkOwnedArticle(userId, articleId);
        expect(result[0].dataValues).toMatchObject(expectedTransaction);
        });
    });


    afterAll(async () => {
        await transactionInstance.destroy();
    });
});

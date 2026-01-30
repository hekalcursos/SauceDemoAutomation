import { test } from './test-options';
import { expect } from '@playwright/test';



    // 🟢 Test 1: Health Check (Is the site alive?)
    test('GET / (Home Page) returns 200 OK', async ({ request }) => {
        const response = await request.get('https://www.saucedemo.com/');
        
    
        console.log(response.status() , response.headers()['content-type'] );

        expect(response.status()).toBe(200);
        
        // Assert it is actually serving HTML (not an error page)
        expect(response.headers()['content-type']).toContain('text/html');
    });